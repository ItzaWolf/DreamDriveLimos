import React, { useState, useEffect } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import UserSignUp from './Components/UserSignUp';
import BookingPage from './Components/BookingPage';
import ReviewList from './Components/ReviewList';
import LimoList from './Components/LimoList';
import UserLogin from './Components/UserLogin';
import UserLogout from './Components/UserLogout';
import Navbar from './Components/NavBar';
import LimoDetail from './Components/LimoDetail';
import UserDetailEdit from './Components/UserDetailEdit'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch('/api/check_session')
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((userData) => {
        if (userData && userData.username) {
          // Assuming 'username' is a field present in user data when a user is logged in
          setUser(userData);
          console.log('User data after login:', userData);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error('Error during check session:', error);
        setIsLoggedIn(false);
      });
  }, []);
  

  function handleNewUser(newUser) {
    setUser(newUser);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser([])
    console.log('User has been logged out!')
  }

return (
  <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
          <Route
              path="/"
              element={
                  <HomePage
                      username={username}
                      setUsername={setUsername}
                      password={password}
                      setPassword={setPassword}
                      user={user}
                  />
              }
          />
          <Route path="/signup" element={<UserSignUp handleNewUser={handleNewUser} />} />
          <Route path="/login" element={<UserLogin setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/booking" element={<BookingPage isLoggedIn={isLoggedIn}/>} />
          <Route path="/reviews" element={<ReviewList isLoggedIn={isLoggedIn}/>} />
          <Route path="/limos" element={<LimoList />} />
          <Route path="/limo/:limoId" element={<LimoDetail isLoggedIn={isLoggedIn}/>} />
          <Route path="/logout" element={<UserLogout handleLogout={handleLogout} />} />
          <Route path="/edituser" element={<UserDetailEdit setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>
  </Router>
);
}

export default App;