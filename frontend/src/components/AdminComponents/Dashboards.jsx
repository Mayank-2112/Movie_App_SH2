import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
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

const Dashboard = () => {
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
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ padding: 2, backgroundColor: "#1c1c1c" }}>
              <Typography variant="h6">Movies</Typography>
              <Button
                component={Link}
                to="/movies"
                variant="contained"
                sx={{ marginTop: "1rem" }}
              >
                Manage Movies
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ padding: 2, backgroundColor: "#1c1c1c" }}>
              <Typography variant="h6">Show Timings</Typography>
              <Button
                component={Link}
                to="/show-timings"
                variant="contained"
                sx={{ marginTop: "1rem" }}
              >
                Manage Show Timings
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ padding: 2, backgroundColor: "#1c1c1c" }}>
              <Typography variant="h6">Reservations</Typography>
              <Button
                component={Link}
                to="/reservations"
                variant="contained"
                sx={{ marginTop: "1rem" }}
              >
                Manage Reservations
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
