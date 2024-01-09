import React, { useState, useEffect } from 'react';

function BookingForm({ limoId }) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [userId, setUserId] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch(`/api/check_session`);
        if (response.ok) {
          const userData = await response.json();
          setUserId(userData.id);
        } else {
          console.error('Failed to fetch user ID');
        }
      } catch (error) {
        console.error('Error during user ID fetch:', error);
      }
    };

    fetchUserId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      const startDateTime = new Date(startTime);
      const endDateTime = new Date(endTime);
  
      const startUtc = new Date(startDateTime.toLocaleString('en-US', { timeZone: 'MST' }));
      const endUtc = new Date(endDateTime.toLocaleString('en-US', { timeZone: 'MST' }));
  
      startUtc.setMinutes(startUtc.getMinutes() - startUtc.getTimezoneOffset());
      endUtc.setMinutes(endUtc.getMinutes() - endUtc.getTimezoneOffset());
  
      const response = await fetch(`/api/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          limo_id: limoId,
          start_time: startUtc,
          end_time: endUtc,
        }),
      });
  
      if (response.ok) {
        // Handle successful booking
        setConfirmationMessage('Booking successful!');
        setErrorMessage('');
      } else {
        // Handle failed booking
        setErrorMessage('Booking failed. Please try again.');
        setConfirmationMessage('');
      }
    } catch (error) {
      console.error('Error during booking:', error);
      setErrorMessage('An error occurred during booking. Please try again.');
      setConfirmationMessage('');
    }
  };

  return (
    <div>
      <h2>Looking to book this limo?</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Start Time:
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          End Time:
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit Booking</button>
      </form>
      {confirmationMessage && <p style={{ color: 'green' }}>{confirmationMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default BookingForm;