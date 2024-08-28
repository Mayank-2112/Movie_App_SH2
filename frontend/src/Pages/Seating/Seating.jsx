import { useState } from "react";
import "./Seating.css"; // We'll define styles in a separate file

const Seating = () => {
  const rows = 20;
  const seatsPerRow = 50;

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (row, seat) => {
    const seatId = `${row}-${seat}`;
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seatId)
        ? prevSelected.filter((id) => id !== seatId)
        : [...prevSelected, seatId]
    );
  };

  const renderSeats = () => {
    let seatsGrid = [];
    for (let i = 0; i < rows; i++) {
      let rowSeats = [];
      for (let j = 0; j < seatsPerRow; j++) {
        const seatId = `${i}-${j}`;
        rowSeats.push(
          <div
            key={seatId}
            className={`seat ${
              selectedSeats.includes(seatId) ? "selected" : ""
            }`}
            onClick={() => toggleSeat(i, j)}
          >
            {String.fromCharCode(65 + i)}
            {j + 1}
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

  return (
    <div className="theater">
      <div className="screen">Screen</div>
      <div className="seating">{renderSeats()}</div>
      <div className="info">Selected Seats: {selectedSeats.length}</div>
    </div>
  );
};

export default Seating;
