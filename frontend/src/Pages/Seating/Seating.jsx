import { useState, useEffect } from "react";
import "./Seating.css"; // We'll define styles in a separate file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Seating = () => {
  // const rows =20;
  // const seatsPerRow = 25;
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const [mv_details, setMv_details] = useState([]);
  const [mv_genre, setMv_genre] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (row, seat) => {
    const seatId = `${row}-${seat}`;
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seatId)
        ? prevSelected.filter((id) => id !== seatId)
        : [...prevSelected, seatId]
    );
  };
  console.log(selectedSeats);
  const renderSeats = (rowStart, colStart, rows, seatsPerRow) => {
    let seatsGrid = [];
    for (let i = rowStart; i <= rows; i++) {
      let rowSeats = [];
      for (let j = colStart; j <= seatsPerRow; j++) {
        const seatId = `${i}-${j}`;
        rowSeats.push(
          <div
            key={seatId}
            className={`seat ${selectedSeats.includes(seatId) ? "selected" : ""
              }`}
            onClick={() => toggleSeat(i, j)}
          >
            {String.fromCharCode(64 + i)}
            {j}
          </div>
        );
      }
      seatsGrid.push(
        <div key={i} className="row">
          {rowSeats}
        </div>
      );
    }
    return seatsGrid;
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
        const data = await response.json();
        setMv_details(data);
        setMv_genre(data.genres); // Make sure this is "genres" instead of "genre"
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    getMovies();
  }, [id]);

  return (
    <>
      <div className="se-home"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${mv_details.backdrop_path})` }}>
      </div>
      <div className="se-above">
        <Link to={`/booknow/${id}`}>
          <FontAwesomeIcon icon={faArrowLeft} className="se-back-button" />
        </Link>
        <div className="se-container">
          <div className="screen-exit">
            <div className="exit">Exit</div>
            <div className="screen">Screen</div>
            <div className="exit">Exit</div>
          </div>
          <h1 className="club">Club - ₹180</h1>
          <div className="seatingSet">

            <div className="col1">
              <div className="seating">{renderSeats(1, 1, 5, 5)}</div>
              <div className="seating">{renderSeats(6, 1, 13, 5)}</div>
              <div className="entry">Entry</div>
            </div>
            <div className="col2">
              <div className="seating">{renderSeats(1, 6, 5, 25)}</div>
              <h1 className="prime">Prime - ₹250</h1>
              <div className="seating">{renderSeats(6, 6, 16, 25)}</div>
              <h1 className="executive">Executive - ₹400</h1>
              <div className="seating">{renderSeats(17, 6, 18, 25)}</div>
            </div>
            <div className="col1">
              <div className="seating">{renderSeats(1, 26, 5, 30)}</div>
              <div className="seating">{renderSeats(6, 26, 13, 30)}</div>
              <div className="entry">Entry</div>
            </div>
          </div>

          <div className="info">Selected Seats: {selectedSeats.length}</div>

        </div>

      </div>


    </>
  );
};

export default Seating;
