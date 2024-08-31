import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000",
      paper: "#1c1c1c",
    },
    text: {
      primary: "#ffffff",
    },
    primary: {
      main: "#90caf9",
    },
  },
});

const seatTypes = ["club", "prime", "executive"];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    ticketNumber: "",
    seatStatus: "club",
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch users from backend (mocked here)
    axios
      .get(`${import.meta.env.REACT_APP_API_URL}/users`)
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    // Filter users based on search query
    setFilteredUsers(
      users.filter((user) =>
        user.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

  const handleAddUser = () => {
    // Logic to add a user
    setUsers([...users, newUser]);
    setFilteredUsers([...filteredUsers, newUser]);
    setNewUser({ name: "", email: "", ticketNumber: "", seatStatus: "club" });
  };

  const handleDeleteUser = (index) => {
    // Logic to delete a user
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    setFilteredUsers(
      updatedUsers.filter((user) =>
        user.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const handleUpdateUser = (index, updatedUser) => {
    // Logic to update a user
    const updatedUsers = users.map((user, i) =>
      i === index ? updatedUser : user
    );
    setUsers(updatedUsers);
    setFilteredUsers(
      updatedUsers.filter((user) =>
        user.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        sx={{
          backgroundColor: "black",
          minHeight: "100vh",
          padding: "2rem",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Manage Users
        </Typography>
        <Paper
          sx={{
            padding: 2,
            backgroundColor: "#1c1c1c",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Search by Ticket Number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                sx={{ marginBottom: "1rem" }}
              />
              <TextField
                label="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                fullWidth
                sx={{ marginBottom: "1rem" }}
              />
              <TextField
                label="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                fullWidth
                sx={{ marginBottom: "1rem" }}
              />
              <TextField
                label="Ticket Number"
                value={newUser.ticketNumber}
                onChange={(e) =>
                  setNewUser({ ...newUser, ticketNumber: e.target.value })
                }
                fullWidth
                sx={{ marginBottom: "1rem" }}
              />
              <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
                <InputLabel>Seat Status</InputLabel>
                <Select
                  value={newUser.seatStatus}
                  onChange={(e) =>
                    setNewUser({ ...newUser, seatStatus: e.target.value })
                  }
                >
                  {seatTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                onClick={handleAddUser}
                variant="contained"
                sx={{ marginBottom: "1rem" }}
              >
                Add User
              </Button>
            </Grid>
            {filteredUsers.map((user, index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  label="Name"
                  value={user.name}
                  onChange={(e) =>
                    handleUpdateUser(index, { ...user, name: e.target.value })
                  }
                  fullWidth
                  sx={{ marginBottom: "1rem" }}
                />
                <TextField
                  label="Email"
                  value={user.email}
                  onChange={(e) =>
                    handleUpdateUser(index, { ...user, email: e.target.value })
                  }
                  fullWidth
                  sx={{ marginBottom: "1rem" }}
                />
                <TextField
                  label="Ticket Number"
                  value={user.ticketNumber}
                  onChange={(e) =>
                    handleUpdateUser(index, {
                      ...user,
                      ticketNumber: e.target.value,
                    })
                  }
                  fullWidth
                  sx={{ marginBottom: "1rem" }}
                />
                <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
                  <InputLabel>Seat Status</InputLabel>
                  <Select
                    value={user.seatStatus}
                    onChange={(e) =>
                      handleUpdateUser(index, {
                        ...user,
                        seatStatus: e.target.value,
                      })
                    }
                  >
                    {seatTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  onClick={() => handleDeleteUser(index)}
                  variant="contained"
                  color="error"
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

export default Users;
