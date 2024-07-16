import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentResult = () => {
  const [status, setStatus] = useState('');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');

    if (paymentId && status) {
      setStatus(status);
      // Aquí puedes hacer una llamada a tu backend para verificar el estado del pago
      verifyPayment(paymentId);
    }
  }, [location]);

  const verifyPayment = async (paymentId) => {
    try {
      const response = await axios.get(`/api/verify-payment/${paymentId}`);
      // Manejar la respuesta
    } catch (error) {
      console.error('Error al verificar el pago:', error);
    }
  };

  return (
    <div>
      <h2>Resultado del Pago</h2>
      {status === 'approved' && <p>¡Pago aprobado!</p>}
      {status === 'pending' && <p>Pago pendiente</p>}
      {status === 'failure' && <p>El pago falló</p>}
    </div>
  );
};

export default PaymentResult;