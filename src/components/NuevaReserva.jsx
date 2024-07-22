import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReserva } from "./redux/slice";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import CheckoutPro from "../MercadoPago/PaymentForm";

const NuevaReserva = ({ prestador, precio = '{"precio": 0, "tiempo": 0}' }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.reservas?.user);
  const reservas = useSelector((state) => state?.reservas?.reservas?.data);
  const prestadores = useSelector((state) => state?.reservas?.prestadores);
  const maxReservasPorDia = useSelector(
    (state) => state?.reservas?.maxReservasPorDia
  );
  const maxReservasPorHora = useSelector(
    (state) => state?.reservas?.maxReservasPorHora
  );

  let selectedPrice;
  try {
    selectedPrice = JSON.parse(precio);
  } catch (error) {
    console.error("Error parsing precio:", error);
    selectedPrice = { precio: 0, tiempo: 0 };
  }

  const initialFormData = {
    nombreCliente: user ? user.username : "",
    email: user ? user.email : "",
    fecha: "",
    hora: "",
    prestador: prestador?.idPrestador,
    precio: selectedPrice?.precio,
    duracion: selectedPrice?.tiempo,
  };

  const HorarioCasillas = ({ availableHours, selectedHour, onChange }) => {
    return (
      <div className="horario-casillas">
        {availableHours.map((hour) => (
          <button
            key={hour}
            type="button"
            className={`horario-casilla ${
              selectedHour === hour ? "selected" : ""
            }`}
            onClick={() => onChange(hour)}
          >
            {hour}
            {selectedHour === hour && <span className="check-icon">✓</span>}
          </button>
        ))}
      </div>
    );
  };
  const [formData, setFormData] = useState(initialFormData);
  const [messages, setMessages] = useState({ success: "", error: "" });
  const [availableDates, setAvailableDates] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);

  useEffect(() => {
    updateAvailableDates();
  }, [formData.prestador, reservas]);

  useEffect(() => {
    updateAvailableHours();
  }, [formData.fecha, formData.prestador, reservas]);

  const updateAvailableDates = () => {
    if (!formData.prestador) return;

    const today = new Date();
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) {
        // Excluye los domingos
        if (!isDayFull(date)) {
          dates.push(date);
        }
      }
    }
    setAvailableDates(dates);
  };

  const updateAvailableHours = () => {
    if (!formData.prestador || !formData.fecha) return;
  
    // Encuentra los datos del prestador
    const prestadorData = prestadores.find((p) => p.id === formData.prestador);
    const horariosConfigurados =
      prestadorData?.attributes?.horarios?.data || [];
    const fechaSeleccionada = formData.fecha.toISOString().split("T")[0];
  
    // Filtra los horarios para la fecha seleccionada
    const horariosDelDia = horariosConfigurados.filter((horario) => {
      const fechaInicio = new Date(horario.attributes.fechaInicio);
      const fechaFin = new Date(horario.attributes.fechaFin);
      return (
        fechaSeleccionada >= fechaInicio.toISOString().split("T")[0] &&
        fechaSeleccionada <= fechaFin.toISOString().split("T")[0]
      );
    });
  
    // Genera todas las horas posibles para el día
    const hours = horariosDelDia.reduce((acc, horario) => {
      const horaInicio = parseInt(horario.attributes.horaInicio.split(":")[0], 10);
      const horaFin = parseInt(horario.attributes.horaFin.split(":")[0], 10);
      for (let i = horaInicio; i < horaFin; i++) {
        const hour = `${i.toString().padStart(2, "0")}:00`;
        acc.push(hour);
      }
      return acc;
    }, []);
  
    // Ordena las horas de menor a mayor
    const sortedHours = hours.sort((a, b) => {
      const timeA = parseInt(a.split(':')[0]) * 60 + parseInt(a.split(':')[1]);
      const timeB = parseInt(b.split(':')[0]) * 60 + parseInt(b.split(':')[1]);
      return timeA - timeB;
    });
  
    // Actualiza el estado o realiza alguna acción con `sortedHours`
    // Ejemplo: actualiza el estado en un componente React
    setAvailableHours(sortedHours);
  };
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "prestador" || name === "fecha") {
      setFormData((prev) => ({ ...prev, hora: "" }));
    }
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, fecha: date });
    setAvailableHours([]);
  };

  const handleHoraChange = (hora) => {
    setFormData({ ...formData, hora });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isHourReserved(formData.fecha, `${formData.hora}:00.000`)) {
      setMessages({
        success: "",
        error: "Este horario ya está reservado. Por favor, elige otro.",
      });
      return;
    }
    try {
      const horaFormateada = `${formData.hora}:00.000`;
      await dispatch(createReserva({ ...formData, hora: horaFormateada }));
      setMessages({ success: "¡Reserva realizada con Éxito!", error: "" });
    } catch (error) {
      setMessages({
        success: "",
        error: error.message || "Error al realizar la reserva.",
      });
    }
  };
  const handlePaymentSuccess = async () => {
    try {
      const horaFormateada = `${formData.hora}:00.000`;
      await dispatch(createReserva({ ...formData, hora: horaFormateada }));
      setMessages({ success: "¡Reserva realizada con Éxito!", error: "" });
    } catch (error) {
      setMessages({
        success: "",
        error: error.message || "Error al realizar la reserva.",
      });
    }
  };

  const telefonoPrestador = "542915729501";
  const handleWhatsApp = () => {
    const prestadorSeleccionado = prestadores.find(
      (p) => p.id === formData.prestador
    );
    const nombrePrestador = prestadorSeleccionado?.attributes?.nombre || "";
    const message = `¡Hola! Quiero confirmar mi reserva:\n\nNombre: ${formData.nombreCliente}\nEmail: ${formData.email}\nFecha: ${formData.fecha}\nHora: ${formData.hora}\nPrestador: ${nombrePrestador}\nPrecio: $${selectedPrice.precio}\nDuración: ${selectedPrice.tiempo} minutos`;
    const whatsappURL = `https://wa.me/${telefonoPrestador}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  const isDayFull = (date) => {
    const validDate = date instanceof Date ? date : new Date(date);
    if (isNaN(validDate.getTime())) {
      console.error("Invalid date:", date);
      return false;
    }
    const dateString = validDate.toISOString().split("T")[0];
    const reservasDelDia = reservas?.filter(
      (reserva) =>
        reserva.attributes.fecha === dateString &&
        reserva.attributes.prestador.data.id === formData.prestador
    );
    return reservasDelDia?.length >= maxReservasPorDia;
  };

  const isHourReserved = (date, hour) => {
    const dateString = date.toISOString().split("T")[0];
    return reservas?.some(
      (reserva) =>
        reserva.attributes.fecha === dateString &&
        reserva.attributes.hora === hour &&
        reserva.attributes.prestador.data.id === formData.prestador
    );
  };

  // Si el usuario ya está logeado, no solicitar nombre ni email
  if (user) {
    return (
      <div className="nueva-reserva-container" style={{ marginBottom: "2rem" }}>
        <h1>Reserva de Turnos</h1>
        <p>
          Campos obligatorios <span style={{ color: "red" }}>*</span>
        </p>
        <form className="nueva-reserva-form" onSubmit={handleSubmit}>
          <div>
            <label>Turno con :</label>
            <select
              name="prestador"
              value={formData.prestador}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar prestador</option>
              {prestadores.map((prestador) => (
                <option key={prestador.id} value={prestador.id}>
                  {prestador.attributes.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Fecha</label>
            <ReactDatePicker
              selected={formData.fecha}
              onChange={handleDateChange}
              includeDates={availableDates}
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div>
            <label>Hora</label>
            <HorarioCasillas
              availableHours={availableHours}
              selectedHour={formData.hora}
              onChange={handleHoraChange}
            />
          </div>
          <div>
            <p style={{ margin: ".5rem 0" }}>Confirmar Reserva</p>
            <button
              type="button"
              onClick={handleWhatsApp}
              style={{
                width: "100%",
                padding: ".5rem",
                backgroundColor: "#25D366",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "center",
                border: "solid 2px #253E8B",
              }}
            >
              Confirmar por WhatsApp
            </button>
            <CheckoutPro
              info={formData}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </div>
        </form>
        {messages.success && (
          <p style={{ color: "green" }}>{messages.success}</p>
        )}
        {messages.error && <p style={{ color: "red" }}>{messages.error}</p>}
      </div>
    );
  }

  return (
    <div className="nueva-reserva-container" style={{ marginBottom: "2rem" }}>
      <h1>Reserva de Turnos</h1>
      <p>
        Campos obligatorios <span style={{ color: "red" }}>*</span>
      </p>
      <form className="nueva-reserva-form" onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre del cliente<span style={{ color: "red" }}>*</span>:
          </label>
          <input
            type="text"
            name="nombreCliente"
            value={formData.nombreCliente}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>
            Email<span style={{ color: "red" }}>*</span>:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Turno con :</label>
          <select
            name="prestador"
            value={formData.prestador}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar prestador</option>
            {prestadores.map((prestador) => (
              <option key={prestador.id} value={prestador.id}>
                {prestador.attributes.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Fecha</label>
          <ReactDatePicker
            selected={formData.fecha}
            onChange={handleDateChange}
            includeDates={availableDates}
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div>
          <label>Hora</label>
          <HorarioCasillas
            availableHours={availableHours}
            selectedHour={formData.hora}
            onChange={handleHoraChange}
          />
        </div>
        <div>
          <p style={{ margin: ".5rem 0" }}>Confirmar Reserva</p>
          <button
            type="button"
            onClick={handleWhatsApp}
            style={{
              width: "100%",
              padding: ".5rem",
              backgroundColor: "#25D366",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              border: "solid 2px #253E8B",
            }}
          >
            Confirmar por WhatsApp
          </button>
          <CheckoutPro
            info={formData}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </div>
      </form>
      {messages.success && <p style={{ color: "green" }}>{messages.success}</p>}
      {messages.error && <p style={{ color: "red" }}>{messages.error}</p>}
    </div>
  );
};

export default NuevaReserva;
