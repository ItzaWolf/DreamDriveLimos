import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UserDetailEdit() {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [editing, setEditing] = useState(false);
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

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`/api/user/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setEditedUser({
          username: userData.username,
          password: userData.password,
        });
      } else {
        console.error('Failed to fetch user details.');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleInputChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/edituser/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        setUser(updatedUserData);
        setEditing(false);
        setConfirmationMessage('User details updated successfully! Please login again.');
        setErrorMessage('');
      } else {
        console.error('Failed to update user details.');
        setErrorMessage('Error updating user details. Please try again.');
        setConfirmationMessage('');
      }
    } catch (error) {
      console.error('Error during user details update:', error);
      setErrorMessage('An error occurred. Please try again.');
      setConfirmationMessage('');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setConfirmationMessage('User deleted successfully!');
        setErrorMessage('');
      } else {
        console.error('Failed to delete user.');
        setErrorMessage('Error deleting user. Please try again.');
        setConfirmationMessage('');
      }
    } catch (error) {
      console.error('Error during user deletion:', error);
      setErrorMessage('An error occurred. Please try again.');
      setConfirmationMessage('');
    }
  };

  if (!user || !editedUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>
        Username:{' '}
        {editing ? (
          <input
            type="text"
            name="username"
            value={editedUser.username || ''}
            onChange={handleInputChange}
          />
        ) : (
          editedUser.username || ''
        )}
      </p>
      <p>
        Password:{' '}
        {editing ? (
          <input
            type="password"
            name="password"
            value={editedUser.password || ''}
            onChange={handleInputChange}
          />
        ) : (
          '********'
        )}
      </p>
      <button onClick={handleEditToggle}>
        {editing ? 'Cancel Edit' : 'Edit'}
      </button>
      {editing && <button onClick={handleSave}>Save</button>}
      <button onClick={handleDelete}>Delete User</button>
      {confirmationMessage && <p style={{ color: 'green' }}>{confirmationMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default UserDetailEdit;