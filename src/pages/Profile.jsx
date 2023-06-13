import React, { useState } from 'react';
import { Avatar, Button, Container, Grid, Tab, Tabs, TextField, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

export default function Profile() {
  // State for user information
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    profilePicture: '', // Add the URL of the profile picture
  });

  // State for active tab
  const [activeTab, setActiveTab] = useState(0);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user information
    // You can send an API request here to update the user's profile on the server
    console.log('Updated user:', user);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
        <Grid item>
          <Avatar sx={{ width: 100, height: 100 }}>
            <AccountCircle sx={{ width: 100, height: 100 }} />
          </Avatar>
        </Grid>
      </Grid>

      <Typography variant="h5" component="h2" align="center" sx={{ mt: 2 }}>
        User Profile
      </Typography>

      <Tabs value={activeTab} onChange={handleTabChange} centered sx={{ mt: 2 }}>
        <Tab label="Profile" />
        <Tab label="Contact" />
        <Tab label="Password" />
      </Tabs>

      {activeTab === 0 && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      )}

      {activeTab === 1 && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={user.address}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      )}

      {activeTab === 2 && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <TextField
                label="Current Password"
                name="currentPassword"
                type="password"
                value={user.currentPassword}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="New Password"
                name="newPassword"
                type="password"
                value={user.newPassword}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Container>
  );
}
