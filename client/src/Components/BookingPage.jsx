import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm';

function BookingPage({ isLoggedIn }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (isLoggedIn) {
          const response = await fetch('/api/booking');
          if (response.ok) {
            const bookingsData = await response.json();
            // Fetch limo details for each booking
            const bookingsWithLimoDetails = await Promise.all(
              bookingsData.map(async (booking) => {
                const limoResponse = await fetch(`/api/limo/${booking.limo_id}`);
                if (limoResponse.ok) {
                  const limoData = await limoResponse.json();
                  return { ...booking, limoName: limoData.name };
                } else {
                  console.error(`Failed to fetch limo details for booking ${booking.id}`);
                  return booking;
                }
              })
            );
            setBookings(bookingsWithLimoDetails);
          } else {
            console.error('Failed to fetch bookings');
          }
        } else {
          // Handle the case when the user is not logged in
          setBookings([]);
        }
      } catch (error) {
        console.error('Error during booking fetch:', error);
      }
    };

    fetchBookings();
  }, [isLoggedIn]);

  return (
    <div>
      <ReviewForm />
      <h2>Bookings</h2>
      <div>
        {bookings.map((booking) => (
          <div key={booking.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h3>{booking.limoName}</h3>
            <p>Start Time: {new Date(booking.start_time).toLocaleString()}</p>
            <p>End Time: {new Date(booking.end_time).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingPage;
