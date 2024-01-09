import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      {/* Header */}
      <header>
        <h1>Welcome to DreamDrive Limo Rentals!</h1>
      </header>

      {/* Image of a Limo */}
      <div>
        <img
          src="https://www.sunsetlimo.com/wp-content/uploads/2022/12/Pinky-moon.jpg"
          alt="DreamDrive Limo Cover"
          style={{ width: '100%', maxWidth: '800px', height: 'auto', borderRadius: '1200px' }}
        />
      </div>

      <section>
        <h2>About Us</h2>
        <p>
          At DreamDrive Limo Rentals, we strive to provide a luxurious and memorable experience for every journey. Our fleet of exquisite limousines, driven by professional chauffeurs, ensures that your special moments are accompanied by unmatched elegance and comfort.
        </p>
        <p>
          With a commitment to exceptional service, we cater to various occasions, including weddings, proms, corporate events, and more. Whether it's a grand celebration or a sophisticated business affair, DreamDrive Limo Rentals is your trusted partner for premium transportation.
        </p>
        <p>
          Explore our stunning limousine collection and embark on a journey where luxury meets perfection. Your dream ride awaits at DreamDrive Limo Rentals!
        </p>
      </section>
    </div>
  );
}

export default HomePage;