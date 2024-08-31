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

  return (
    <div className="theater">
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
  );
};

export default Seating;
