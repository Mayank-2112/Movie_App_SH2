import React, { useState } from 'react'
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {signOutSuccess,signOutFailure} from '../../redux/user/userSlice.js';

const Profile = ({onClose}) => {
    const {currentUser} = useSelector((state)=> state.user);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
      const handleSignOut = async()=>{
        try {
          const res = await fetch('/backend/user/signout',{
            method: 'POST'
          });
          const data = await res.json();
          if(res.ok){
            onClose();
            dispatch(signOutSuccess());
          }
          else{
            console.log(data.message);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
    
  return (
    <div className='profile'>
        <FontAwesomeIcon icon={faCircleXmark} onClick={onClose}  className='close'/>
        <div className="pr-main">
            <h1>User Profile</h1>
            <img src={currentUser.profilePicture} alt={currentUser.fullname} className='pr-img'/>
            <form>
                <input type="text" placeholder='FullName' id='fullname' onChange={handleChange} value={currentUser.fullname}/>
                <input type="email" placeholder='Email' id='email' onChange={handleChange} value={currentUser.email}/>
                <input type="text" placeholder='City' id='city' onChange={handleChange} value={currentUser.city}/>
                <input type="password" placeholder='Password' id='password' onChange={handleChange} value={currentUser.password} />
                <button className='btn' type='submit'>Update Profile</button>
            </form>
            <div className="func">
                <p className='delete'>Delete Account</p>
                <p className='logOut' onClick={handleSignOut}>LogOut</p>
            </div>
        </div>

    </div>
  )
}

export default Profile