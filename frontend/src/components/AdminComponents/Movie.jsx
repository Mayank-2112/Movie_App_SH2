import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000", // Black background for the entire app
      paper: "#1c1c1c", // Darker background for Paper components
    },
    text: {
      primary: "#ffffff", // White text color
    },
    primary: {
      main: "#90caf9", // Light blue for buttons, etc.
    },
  },
});

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    name: "",
    screenNumber: "",
    startTime: "",
    endTime: "",
  });

  const handleAddMovie = () => {
    // Logic to add a movie
    setMovies([...movies, newMovie]);
    setNewMovie({ name: "", screenNumber: "", startTime: "", endTime: "" });
  };

  const handleDeleteMovie = (index) => {
    // Logic to delete a movie
    const updatedMovies = movies.filter((_, i) => i !== index);
    setMovies(updatedMovies);
  };

  const handleUpdateMovie = (index, updatedMovie) => {
    // Logic to update a movie
    const updatedMovies = movies.map((movie, i) =>
      i === index ? updatedMovie : movie
    );
    setMovies(updatedMovies);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        sx={{
          backgroundColor: "black", // Ensure the Container has a black background
          minHeight: "100vh", // Full viewport height
          padding: "2rem",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Manage Movies
        </Typography>
        <Paper sx={{ padding: 2, backgroundColor: "#1c1c1c" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Movie Name"
                value={newMovie.name}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, name: e.target.value })
                }
                fullWidth
                sx={{ backgroundColor: "#424242", color: "#fff" }} // Darker input field
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth sx={{ backgroundColor: "#424242" }}>
                <InputLabel>Screen Number</InputLabel>
                <Select
                  value={newMovie.screenNumber}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, screenNumber: e.target.value })
                  }
                >
                  <MenuItem value="Screen 1">Screen 1</MenuItem>
                  <MenuItem value="Screen 2">Screen 2</MenuItem>
                  <MenuItem value="Screen 3">Screen 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Start Time"
                type="time"
                value={newMovie.startTime}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, startTime: e.target.value })
                }
                fullWidth
                sx={{ backgroundColor: "#424242", color: "#fff" }} // Darker input field
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="End Time"
                type="time"
                value={newMovie.endTime}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, endTime: e.target.value })
                }
                fullWidth
                sx={{ backgroundColor: "#424242", color: "#fff" }} // Darker input field
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button onClick={handleAddMovie} variant="contained">
                Add Movie
              </Button>
            </Grid>

            {movies.map((movie, index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  label="Movie Name"
                  value={movie.name}
                  onChange={(e) =>
                    handleUpdateMovie(index, {
                      ...movie,
                      name: e.target.value,
                    })
                  }
                  fullWidth
                  sx={{ backgroundColor: "#424242", color: "#fff" }} // Darker input field
                />
                <FormControl fullWidth sx={{ backgroundColor: "#424242" }}>
                  <InputLabel>Screen Number</InputLabel>
                  <Select
                    value={movie.screenNumber}
                    onChange={(e) =>
                      handleUpdateMovie(index, {
                        ...movie,
                        screenNumber: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="Screen 1">Screen 1</MenuItem>
                    <MenuItem value="Screen 2">Screen 2</MenuItem>
                    <MenuItem value="Screen 3">Screen 3</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Start Time"
                  type="time"
                  value={movie.startTime}
                  onChange={(e) =>
                    handleUpdateMovie(index, {
                      ...movie,
                      startTime: e.target.value,
                    })
                  }
                  fullWidth
                  sx={{ backgroundColor: "#424242", color: "#fff" }} // Darker input field
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label="End Time"
                  type="time"
                  value={movie.endTime}
                  onChange={(e) =>
                    handleUpdateMovie(index, {
                      ...movie,
                      endTime: e.target.value,
                    })
                  }
                  fullWidth
                  sx={{ backgroundColor: "#424242", color: "#fff" }} // Darker input field
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button
                  onClick={() => handleDeleteMovie(index)}
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
    </ThemeProvider>
  );
};

export default Movies;
