import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

let rzp; 

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appointment = location.state?.appointment;
  const [orderId, setOrderId] = useState('');
  const [paymentError, setPaymentError] = useState('');

  useEffect(() => {
    if (!appointment) {
      navigate('/appointment');
      return;
    }

    const createRazorpayOrder = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/payments/create-order', {
          amount: 500,
          receipt: appointment._id,
        });
        setOrderId(response.data.id);
        loadRazorpay(response.data);
      } catch (error) {
        console.error('Error creating Razorpay order:', error);
        setPaymentError('Could not initiate payment. Please try again.');
      }
    };

    createRazorpayOrder();
  }, [appointment, navigate]);

  const loadRazorpay = (order) => {
    // Prevent duplicate Razorpay script loads
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      displayRazorpay(order);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      displayRazorpay(order);
    };
    document.body.appendChild(script);
  };

  const displayRazorpay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: 'Healifi',
      description: 'Payment for Appointment',
      image: '/logo.png',
      handler: async function (response) {
        try {
          const verificationResponse = await axios.post(
            'http://localhost:5000/api/payments/verify-payment',
            {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              appointmentId: appointment._id, 
            }
          );

          rzp.close(); // Force close the Razorpay modal

          console.log('Payment successful:', verificationResponse.data);
          navigate('/payment/success', { state: { appointment } });
        } catch (error) {
          console.error('Payment verification failed:', error);
          setPaymentError('Payment failed. Please try again.');
        }
      },
      prefill: {
        name: appointment.name,
        email: appointment.email,
        contact: appointment.phoneNumber, 
      },
      theme: {
        color: '#3399cc',
      },
    };

    rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="payment-container">
      <h2>Payment for Appointment</h2>
      {paymentError && <div className="error-message">{paymentError}</div>}
      {appointment && (
        <div className="appointment-details">
          <p>Name: {appointment.name}</p>
          <p>Doctor: {appointment.doctor}</p>
          <p>Date: {new Date(appointment.date).toLocaleDateString()} {new Date(appointment.date).toLocaleTimeString()}</p>
          <p>Amount: ₹500</p>
        </div>
      )}
      {!orderId && !paymentError && <p>Initiating payment...</p>}
    </div>
  );
};

export default Payment;
