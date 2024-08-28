import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
} from "@mui/material";

// useEffect(() => {
//   // Fetch movies from backend
//   axios
//     .get(`${process.env.REACT_APP_API_URL}/movies`)
//     .then((response) => setMovies(response.data))
//     .catch((error) => console.error("Error fetching movies:", error));
// }, []);
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState("");

  const handleAddMovie = () => {
    // Logic to add a movie
    setMovies([...movies, { name: newMovie }]);
    setNewMovie("");
  };

  const handleDeleteMovie = (index) => {
    // Logic to delete a movie
    const updatedMovies = movies.filter((_, i) => i !== index);
    setMovies(updatedMovies);
  };

  const handleUpdateMovie = (index, newName) => {
    // Logic to update a movie
    const updatedMovies = movies.map((movie, i) =>
      i === index ? { ...movie, name: newName } : movie
    );
    setMovies(updatedMovies);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Movies
      </Typography>
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Add New Movie"
              value={newMovie}
              onChange={(e) => setNewMovie(e.target.value)}
              fullWidth
            />
            <Button onClick={handleAddMovie}>Add Movie</Button>
          </Grid>
          {movies.map((movie, index) => (
            <Grid item xs={12} key={index}>
              <TextField
                value={movie.name}
                onChange={(e) => handleUpdateMovie(index, e.target.value)}
                fullWidth
              />
              <Button onClick={() => handleDeleteMovie(index)}>Delete</Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Movies;
