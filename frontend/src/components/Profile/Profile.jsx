import React, { useState, useEffect } from 'react';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { signOutSuccess, signOutFailure, updateUserSuccess, updateUserFailure, updateUserStart, deleteUserSuccess, deleteUserFailure, deleteUserStart } from '../../redux/user/userSlice.js';

const Profile = ({ onClose }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    fullname: currentUser.fullname || '',
    email: currentUser.email || '',
    city: currentUser.city || '',
    password: '', // Typically, password fields are left empty for security
  });
  const dispatch = useDispatch();
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(null);
  const [userUpdateError, setUserUpdateError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserUpdateError(null);
    setUserUpdateSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUserUpdateError('No Change Made');
      return;
    }
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/backend/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(updateUserSuccess(data));
        setUserUpdateSuccess('User updated successfully!!');
        onClose();
      } else {
        dispatch(updateUserFailure(data.message));
        setUserUpdateError(data.message);
        console.log(data.message);
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setUserUpdateError(error.message);
      console.log(error);
    }
  };

  const handleDeleteUser = async (e)=>{
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/backend/user/delete/${currentUser._id}`,{
        method: 'DELETE',
      });
      const data = await res.json();
      if(res.ok){
        dispatch(deleteUserSuccess());
        onClose();
      }
      else{
        dispatch(deleteUserFailure());
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch('/backend/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok) {
        onClose();
        dispatch(signOutSuccess());
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='profile'>
      <FontAwesomeIcon icon={faCircleXmark} onClick={onClose} className='close' />
      <div className="pr-main">
        <h1>Profile</h1>
        <img src={currentUser.profilePicture} alt={currentUser.fullname} className='pr-img' />
        <form onSubmit={handleSubmit}>
          <div className="new-div">
          <input type="text" placeholder='FullName' id='fullname' onChange={handleChange} value={formData.fullname} />
          <input type="email" placeholder='Email' id='email' onChange={handleChange} value={formData.email} />
          <input type="text" placeholder='City' id='city' onChange={handleChange} value={formData.city} />
          <input type="password" placeholder='Password' id='password' onChange={handleChange} value={formData.password} />
          <button className='btn' type='submit'>Update Profile</button>
          </div>
        </form>
        <div className="func">
          <p className='delete'onClick={handleDeleteUser}>Delete Account</p>
          <p className='logOut' onClick={handleSignOut}>LogOut</p>
        </div>
        {userUpdateError ? (<p className='pr-error'>{userUpdateError}</p>) : (<p className='pr-success'>{userUpdateSuccess}</p>)}
      </div>
    </div>
  );
};

export default Profile;
