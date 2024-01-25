import React, { useState, useEffect } from 'react';

function BookingPage({ isLoggedIn }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (isLoggedIn) {
          const response = await fetch('/api/booking');
          if (response.ok) {
            const bookingsData = await response.json();
            setBookings(bookingsData);
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
      <h2>Bookings</h2>
      <div>
        {bookings.map((booking) => (
          <div key={booking.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            <h3>Limo: {booking.limo_id}</h3>
            <p>User ID: {booking.user_id}</p>
            <p>Start Time: {new Date(booking.start_time).toLocaleString()}</p>
            <p>End Time: {new Date(booking.end_time).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingPage;