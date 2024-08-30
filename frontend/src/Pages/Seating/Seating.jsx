import { useState } from "react";
import "./Seating.css"; // We'll define styles in a separate file

const Seating = () => {
  // const rows =20;
  // const seatsPerRow = 25;

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (row, seat) => {
    const seatId = `${row}-${seat}`;
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seatId)
        ? prevSelected.filter((id) => id !== seatId)
        : [...prevSelected, seatId]
    );
  };

  const renderSeats = (rowStart,colStart,rows,seatsPerRow) => {
    let seatsGrid = [];
    for (let i = rowStart; i <= rows; i++) {
      let rowSeats = [];
      for (let j = colStart; j <= seatsPerRow; j++) {
        const seatId = `${i}-${j}`;
        rowSeats.push(
          <div
            key={seatId}
            className={`seat ${
              selectedSeats.includes(seatId) ? "selected" : ""
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

  return (
    <div className="theater">
      <div className="screen-exit">
        <div className="exit">Exit</div>
        <div className="screen">Screen</div>
        <div className="exit">Exit</div>
      </div>
      <h1 className="club">Club - ₹180</h1>
      <div className="row1">
        <div className="seating">{renderSeats(1,1,5,5)}</div>
        <div className="seating">{renderSeats(1,1,5,20)}</div>
        <div className="seating">{renderSeats(1,1,5,5)}</div>
      </div>
      <h1 className="prime">Prime - ₹250</h1>
      <div className="row2">
        <div className="seating">{renderSeats(1,1,8,5)}</div>
        <div className="seating">{renderSeats(1,1,11,20)}</div>
        <div className="seating">{renderSeats(1,1,8,5)}</div>

      </div>

      <div className="info">Selected Seats: {selectedSeats.length}</div>
    </div>
  );
};

export default Seating;
