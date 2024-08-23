import React, { useEffect, useState } from 'react'

const TheaterDropdown = ({lat,lng,city}) => {

    useEffect(() => {
        if (lat && lng) {
          getTheaters(lat, lng);
        }
      }, [lat, lng]);

    const [theater, setTheater] = useState([]);
    const [activeTheater, setActiveTheater] = useState(false);
    const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  const filmId = '364605';
  
    const getTheaters = async (lat,lng)=>{
      try{
        const res = await fetch(`https://api-gate2.movieglu.com/cinemasNearby/?n=30`,{
            method: 'GET',
            headers:{
              'client' : 'MOVI_227',
              'x-api-key': import.meta.env.VITE_X_API_KEY,
              'authorization': import.meta.env.VITE_AUTHORIZATION,
              'territory': 'IN',
              'api-version': 'v200',
              'geolocation':`${lat};${lng}`,
              'device-datetime': `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`
            },

        });
        const data = await res.json();
        if (res.ok){
          console.log(data.cinemas);
          const filteredTheater = data.cinemas.filter(theat => theat.city === city);
          setTheater(filteredTheater);
        }
        else{
          console.error('HTTP error:', res.status, res.statusText);
          console.error('Response body:', data);
        }
      }catch(error){
        console.log(error.message);
        
      }
    };
    const handleActiveTheater = (event) => {
        const selectedTheaterId = event.target.value;
        const selectedTheater = theater.find(theat => theat.cinema_id === selectedTheaterId);
        
        setActiveTheater(selectedTheaterId);
    
        if (selectedTheater && selectedTheater.showings && selectedTheater.showings.Standard) {
          setShowTimmings(selectedTheater.showings.Standard.times);
        } else {
          setShowTimmings([]);
          console.log('No showings available for the selected theater');
        }
      };
    
  return (
    <>
        <select id="theater" onChange={handleActiveTheater}>
        <option value="">Select a theater</option>
        {theater && theater.map((theater, idx) => (
          <option key={idx} value={theater.cinema_id}>
            {theater.cinema_name}, {theater.address}
          </option>
        ))}
      </select>
    </>
  )
}

export default TheaterDropdown