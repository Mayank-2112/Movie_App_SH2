import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import axios from "axios";

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

const ShowTiming = () => {
  const [showTimings, setShowTimings] = useState([]);
  const [newShowTiming, setNewShowTiming] = useState({
    movieName: "",
    start: "",
    end: "",
  });

  const handleAddShowTiming = () => {
    // Logic to add a show timing
    setShowTimings([...showTimings, newShowTiming]);
    setNewShowTiming({ movieName: "", start: "", end: "" });
  };

  const handleDeleteShowTiming = (index) => {
    // Logic to delete a show timing
    const updatedShowTimings = showTimings.filter((_, i) => i !== index);
    setShowTimings(updatedShowTimings);
  };

  const handleUpdateShowTiming = (index, updatedTiming) => {
    // Logic to update a show timing
    const updatedShowTimings = showTimings.map((showTiming, i) =>
      i === index ? updatedTiming : showTiming
    );
    setShowTimings(updatedShowTimings);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        sx={{
          backgroundColor: "black", // Black background for the entire Container
          minHeight: "100vh", // Full viewport height
          padding: "2rem",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Manage Show Timings
        </Typography>
        <Paper
          sx={{
            padding: 2,
            backgroundColor: "#1c1c1c", // Darker background for Paper
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Movie Name"
                value={newShowTiming.movieName}
                onChange={(e) =>
                  setNewShowTiming({
                    ...newShowTiming,
                    movieName: e.target.value,
                  })
                }
                fullWidth
                sx={{ marginBottom: "1rem" }} // Add margin below TextField
              />
              <TextField
                label="Start Time"
                type="time"
                value={newShowTiming.start}
                onChange={(e) =>
                  setNewShowTiming({ ...newShowTiming, start: e.target.value })
                }
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ marginBottom: "1rem" }} // Add margin below TextField
              />
              <TextField
                label="End Time"
                type="time"
                value={newShowTiming.end}
                onChange={(e) =>
                  setNewShowTiming({ ...newShowTiming, end: e.target.value })
                }
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ marginBottom: "1rem" }} // Add margin below TextField
              />
              <Button
                onClick={handleAddShowTiming}
                variant="contained"
                sx={{ marginBottom: "1rem" }} // Add margin below Button
              >
                Add Show Timing
              </Button>
            </Grid>
            {showTimings.map((showTiming, index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  value={showTiming.movieName}
                  onChange={(e) =>
                    handleUpdateShowTiming(index, {
                      ...showTiming,
                      movieName: e.target.value,
                    })
                  }
                  fullWidth
                  sx={{ marginBottom: "1rem" }} // Add margin below TextField
                />
                <TextField
                  label="Start Time"
                  type="time"
                  value={showTiming.start}
                  onChange={(e) =>
                    handleUpdateShowTiming(index, {
                      ...showTiming,
                      start: e.target.value,
                    })
                  }
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ marginBottom: "1rem" }} // Add margin below TextField
                />
                <TextField
                  label="End Time"
                  type="time"
                  value={showTiming.end}
                  onChange={(e) =>
                    handleUpdateShowTiming(index, {
                      ...showTiming,
                      end: e.target.value,
                    })
                  }
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ marginBottom: "1rem" }} // Add margin below TextField
                />
                <Button
                  onClick={() => handleDeleteShowTiming(index)}
                  variant="contained"
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

export default ShowTiming;
