import { useState } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { routes } from '../lib/routes';

export default function ReservationForm({ type }) {
  const [routeId, setRouteId] = useState(routes[0].id);
  const [time, setTime] = useState(routes[0].times[0]);
  const [date, setDate] = useState('');
  const [price, setPrice] = useState(20);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user?.email) {
      return alert('Login required with a valid email');
    }

    await addDoc(collection(db, 'reservations'), {
      type,
      routeId,
      time,
      date,
      price,
      userId: user.uid,
      userEmail: user.email,
      matched: false,
      createdAt: serverTimestamp()
    });

    alert('Posted successfully!');
  };

  const selectedRoute = routes.find(r => r.id === routeId);
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* form fields as before */}
    </form>
  );
}