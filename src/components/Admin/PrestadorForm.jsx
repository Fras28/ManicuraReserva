import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPrestador, fetchPrestadores } from '../redux/slice';

const PrestadorForm = () => {
  const dispatch = useDispatch();
  const prestadores = useSelector(state => state.reservas.prestadores);
  console.log(prestadores, "prestadores en prestador form");

  const [formData, setFormData] = useState({
    Servicio: '',
    avatar: '',
    nombre: '',
    telefono: '',
    comercios: '',
    horarios: '',
    valors: '',
    fondoPerfil: '',
  });

  useEffect(() => {
    dispatch(fetchPrestadores());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      Servicio: formData.Servicio,
      avatar: parseInt(formData.avatar),
      nombre: formData.nombre,
      telefono: formData.telefono,
      comercios: { 
        disconnect: [], 
        connect: formData.comercios.split(',').map(id => ({ id: parseInt(id.trim()), position: { end: true } }))
      },
      horarios: {
        disconnect: [],
        connect: formData.horarios.split(',').map((id, index, array) => ({ 
          id: parseInt(id.trim()), 
          position: index === 0 ? { end: true } : { before: parseInt(array[index-1].trim()) }
        }))
      },
      valors: {
        disconnect: [],
        connect: formData.valors.split(',').map(id => ({ id: parseInt(id.trim()), position: { end: true } }))
      },
      fondoPerfil: parseInt(formData.fondoPerfil),
      reservas: { disconnect: [], connect: [] }
    };
    
    dispatch(createPrestador(payload));
  };

  // Verificar si prestadores es un array
  const prestadoresArray = Array.isArray(prestadores) ? prestadores : [];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Crear Nuevo Prestador</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ... (los campos del formulario permanecen igual) ... */}

        <div>
          <button 
            type="submit" 
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Crear Prestador
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Prestadores Existentes</h3>
        {prestadoresArray.length === 0 ? (
          <p>No hay prestadores disponibles o están cargando...</p>
        ) : (
          <ul className="list-disc pl-5">
            {prestadoresArray.map(prestador => (
              <li key={prestador.id}>
                {prestador.attributes?.nombre || 'Nombre no disponible'} - 
                {prestador.attributes?.Servicio || 'Servicio no disponible'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PrestadorForm;