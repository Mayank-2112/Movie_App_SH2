import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [newReservation, setNewReservation] = useState({
    theaterId: "",
    date: "",
    time: "",
  });
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/reservations`)
      .then((response) => setReservations(response.data))
      .catch((error) => console.error("Error fetching reservations:", error));

    axios
      .get(`${process.env.REACT_APP_API_URL}/theaters`)
      .then((response) => setTheaters(response.data))
      .catch((error) => console.error("Error fetching theaters:", error));
  }, []);

  const handleAddReservation = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/reservations`, newReservation)
      .then((response) => {
        setReservations([...reservations, response.data]);
        setNewReservation({ theaterId: "", date: "", time: "" });
      })
      .catch((error) => console.error("Error adding reservation:", error));
  };

  const handleDeleteReservation = (index) => {
    const reservationToDelete = reservations[index];
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/reservations/${reservationToDelete.id}`
      )
      .then(() => {
        const updatedReservations = reservations.filter((_, i) => i !== index);
        setReservations(updatedReservations);
      })
      .catch((error) => console.error("Error deleting reservation:", error));
  };

  const handleUpdateReservation = (index, updatedReservation) => {
    const reservationToUpdate = reservations[index];
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/reservations/${reservationToUpdate.id}`,
        updatedReservation
      )
      .then((response) => {
        const updatedReservations = reservations.map((reservation, i) =>
          i === index ? response.data : reservation
        );
        setReservations(updatedReservations);
      })
      .catch((error) => console.error("Error updating reservation:", error));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Theater Reservations
      </Typography>

      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Theater</InputLabel>
              <Select
                value={newReservation.theaterId}
                onChange={(e) =>
                  setNewReservation({
                    ...newReservation,
                    theaterId: e.target.value,
                  })
                }
              >
                {theaters.map((theater) => (
                  <MenuItem key={theater.id} value={theater.id}>
                    {theater.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Date"
              type="date"
              value={newReservation.date}
              onChange={(e) =>
                setNewReservation({ ...newReservation, date: e.target.value })
              }
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
            <TextField
              label="Time"
              type="time"
              value={newReservation.time}
              onChange={(e) =>
                setNewReservation({ ...newReservation, time: e.target.value })
              }
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
            <Button
              onClick={handleAddReservation}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Add Reservation
            </Button>
          </Grid>

          {reservations.map((reservation, index) => (
            <Grid item xs={12} key={index}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Theater</InputLabel>
                <Select
                  value={reservation.theaterId}
                  onChange={(e) =>
                    handleUpdateReservation(index, {
                      ...reservation,
                      theaterId: e.target.value,
                    })
                  }
                >
                  {theaters.map((theater) => (
                    <MenuItem key={theater.id} value={theater.id}>
                      {theater.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Date"
                type="date"
                value={reservation.date}
                onChange={(e) =>
                  handleUpdateReservation(index, {
                    ...reservation,
                    date: e.target.value,
                  })
                }
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />

              <TextField
                label="Time"
                type="time"
                value={reservation.time}
                onChange={(e) =>
                  handleUpdateReservation(index, {
                    ...reservation,
                    time: e.target.value,
                  })
                }
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />

              <Button
                onClick={() => handleDeleteReservation(index)}
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
              >
                Delete
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Reservations;
