import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReserva } from "./redux/slice";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import CheckoutPro from "../MercadoPago/PaymentForm";
import classNames from "classnames";

const NuevaReserva = ({ prestador, precio  }) => {
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
  }

  const initialFormData = {
    nombreCliente: user ? user.username : "",
    email: user ? user.email : "",
    fecha:"",
    hora: "",
    prestador: prestador?.idPrestador,
    precio: selectedPrice,
  };
console.log(selectedPrice,"selectedPrice");
  const HorarioCasillas = ({ availableHours, selectedHour, onChange }) => {
    return (
      <div className="horario-casillas">
        {availableHours?.map((hour) => (
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
  const [unavailableDates, setUnavailableDates] = useState([]);
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

    const selectedPrestador = prestadores.find(
      (p) => p.id === parseInt(formData.prestador)
    );
    if (!selectedPrestador) return;

    const today = new Date();
    const dates = [];
    const unavailableDates = [];

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split("T")[0]; // YYYY-MM-DD format

      const hasAvailableHorario =
        selectedPrestador.attributes.horarios.data.some((horario) => {
          const horarioStart = new Date(horario.attributes.fechaInicio);
          const horarioEnd = new Date(horario.attributes.fechaFin);
          const isWithinDateRange = date >= horarioStart && date <= horarioEnd;

          if (isWithinDateRange) {
            const horaInicio = new Date(
              `${dateString}T${horario.attributes.horaInicio}`
            );
            const horaFin = new Date(
              `${dateString}T${horario.attributes.horaFin}`
            );
            return horaFin > horaInicio; // Check if there's actually time available on this day
          }
          return false;
        });

      if (hasAvailableHorario) {
        if (isDayFull(date)) {
          unavailableDates.push(date);
        } else {
          dates.push(date);
        }
      }
    }
    setAvailableDates(dates);
    setUnavailableDates(unavailableDates);
  };

  const updateAvailableHours = () => {
    if (!formData.prestador || !formData.fecha) return;
  
    const selectedPrestador = prestadores.find(p => p.id === parseInt(formData.prestador));
    if (!selectedPrestador) return;
  
    const selectedDate = new Date(formData.fecha);
    const dateString = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD format
  
    // Find all horarios that include the selected date
    const relevantHorarios = selectedPrestador.attributes.horarios.data.filter(horario => {
      const horarioStart = new Date(horario.attributes.fechaInicio);
      const horarioEnd = new Date(horario.attributes.fechaFin);
      return selectedDate >= horarioStart && selectedDate <= horarioEnd;
    });
  
    let availableHours = [];
    relevantHorarios.forEach(horario => {
      const startHour = parseInt(horario.attributes.horaInicio.split(':')[0]);
      const endHour = parseInt(horario.attributes.horaFin.split(':')[0]);
      
      for (let hour = startHour; hour < endHour; hour++) {
        availableHours.push(`${hour.toString().padStart(2, '0')}:00`);
      }
    });
  
    // Remove duplicates and sort
    availableHours = [...new Set(availableHours)].sort();
  
    // Filter out already reserved hours
    const reservedHours = selectedPrestador.attributes.reservas.data
      .filter(reserva => reserva.attributes.fecha === dateString)
      .map(reserva => reserva.attributes.hora.slice(0, 5));
  
    availableHours = availableHours.filter(hour => !reservedHours.includes(hour));
  
    setAvailableHours(availableHours);
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
      const fechaFormateada = formData.fecha.toISOString().split("T")[0];
      await dispatch(
        createReserva({
          ...formData,
          hora: horaFormateada,
          fecha: fechaFormateada,
        })
      );
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
      const fechaFormateada = formData.fecha.toISOString().split("T")[0];
      await dispatch(
        createReserva({
          ...formData,
          hora: horaFormateada,
          fecha: fechaFormateada,
        })
      );
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
    const fechaFormateada = formData.fecha
      ? formData.fecha.toISOString().split("T")[0]
      : "";
    const message = `¡Hola! Quiero confirmar mi reserva:\n\nNombre: ${formData.nombreCliente}\nEmail: ${formData.email}\nFecha: ${fechaFormateada}\nHora: ${formData.hora}\nPrestador: ${nombrePrestador}\nPrecio: $${selectedPrice.precio}\nDuración: ${selectedPrice.tiempo} minutos`;
    const whatsappURL = `https://wa.me/${telefonoPrestador}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  const isDayFull = (date) => {
    const dateString = date.toISOString().split("T")[0];
    const reservasDelDia = reservas?.filter(
      (reserva) =>
        reserva?.attributes?.fecha === dateString &&
        reserva?.attributes?.prestador?.data.id === parseInt(formData.prestador)
    );
    return reservasDelDia?.length >= maxReservasPorDia;
  };

  const isHourReserved = (date, hour) => {
    const dateString =
      date instanceof Date ? date.toISOString().split("T")[0] : date;
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
              placeholderText="Seleccionar fecha"
              required
              dayClassName={(date) => {
                const dateString = date.toISOString().split("T")[0];
                return classNames({
                  "date-unavailable": isDayFull(date),
                  "date-available": availableDates.some(
                    (d) => d.toISOString().split("T")[0] === dateString
                  ),
                });
              }}
            />
          </div>
          <div>
            <label>Hora</label>
            <HorarioCasillas
              availableHours={availableHours}
              selectedHour={formData.hora}
              onChange={handleHoraChange}
            />
            {availableHours.length === 0 && (
              <p>No hay horarios disponibles para la fecha seleccionada.</p>
            )}
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
              placeholderText="Seleccionar fecha"
              required
              dayClassName={(date) => {
                const dateString = date.toISOString().split("T")[0];
                return classNames({
                  "date-unavailable": isDayFull(date),
                  "date-available": availableDates.some(
                    (d) => d.toISOString().split("T")[0] === dateString
                  ),
                });
              }}
            />
        </div>
        <div>
          <label>Hora</label>
          <HorarioCasillas
            availableHours={availableHours}
            selectedHour={formData.hora}
            onChange={handleHoraChange}
          />
          {availableHours.length === 0 && (
            <p>No hay horarios disponibles para la fecha seleccionada.</p>
          )}
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
