import React, { useEffect, useState } from 'react'

const ShowTimings = ({filmId,theaterId,date,lat,lng}) => {
    useEffect(()=>{
        if(filmId && theaterId && date && lat && lng){
            getShowTimings(filmId,date,theaterId,lat,lng);
        }
    },[filmId,theaterId,date]);

    const [showTimmings,setShowTimmings] = useState([]);
    const [activeTime, setActiveTime] = useState(0);

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const getShowTimings = async (filmId,date,theaterId,lat,lng)=>{

        try {
            const res = await fetch(`https://api-gate2.movieglu.com/cinemaShowTimes/?film_id=${filmId}&cinema_id=${theaterId}&date=${date.year}-${date.month}-${date.date}`,{
                method: 'GET',
                headers:{
                  'client' : 'MOVI_229',
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
              setShowTimmings(data.films[0].showings.Standard.times);
              
            }
            else{
              console.error('HTTP error:', res.status, res.statusText);
              console.error('Response body:', data);
            }
        } catch (error) {
            console.log(error.message);
            
        }
        
    };
    const handleTimeChange = async (key)=>{
      setActiveTime(key);
    }
    console.log(showTimmings)

  return (
    <>
      <div>
      {showTimmings && showTimmings.map((timing, index) => (
          <button key={index} onClick={()=>handleTimeChange(index)}
          style={{background : index === activeTime ? 'blue':'grey'}}>
            {timing.start_time}
          </button>
        ))}

      </div>
    </>
  )
}

export default ShowTimings