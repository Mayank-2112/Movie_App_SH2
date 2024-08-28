import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Paper, Typography, Button } from "@mui/material";

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper>
            <Typography variant="h6">Movies</Typography>
            <Button component={Link} to="/movies">
              Manage Movies
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper>
            <Typography variant="h6">Show Timings</Typography>
            <Button component={Link} to="/show-timings">
              Manage Show Timings
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper>
            <Typography variant="h6">Reservations</Typography>
            <Button component={Link} to="/reservations">
              Manage Reservations
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
