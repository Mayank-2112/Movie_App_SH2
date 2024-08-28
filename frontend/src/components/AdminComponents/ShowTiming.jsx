import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
} from "@mui/material";

const ShowTiming = () => {
  const [showTimings, setShowTimings] = useState([]);
  const [newShowTime, setNewShowTime] = useState("");

  const handleAddShowTime = () => {
    // Logic to add a show timing
    setShowTimings([...showTimings, { time: newShowTime }]);
    setNewShowTime("");
  };

  const handleDeleteShowTime = (index) => {
    // Logic to delete a show timing
    const updatedShowTimings = showTimings.filter((_, i) => i !== index);
    setShowTimings(updatedShowTimings);
  };

  const handleUpdateShowTime = (index, newTime) => {
    // Logic to update a show timing
    const updatedShowTimings = showTimings.map((showTime, i) =>
      i === index ? { ...showTime, time: newTime } : showTime
    );
    setShowTimings(updatedShowTimings);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Show Timings
      </Typography>
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Add New Show Timing"
              value={newShowTime}
              onChange={(e) => setNewShowTime(e.target.value)}
              fullWidth
            />
            <Button onClick={handleAddShowTime}>Add Show Timing</Button>
          </Grid>
          {showTimings.map((showTime, index) => (
            <Grid item xs={12} key={index}>
              <TextField
                value={showTime.time}
                onChange={(e) => handleUpdateShowTime(index, e.target.value)}
                fullWidth
              />
              <Button onClick={() => handleDeleteShowTime(index)}>
                Delete
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default ShowTiming;
