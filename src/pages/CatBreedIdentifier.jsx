import React, { useState, useRef } from 'react';
import { Button, Card, Box, CardContent, CardMedia, Typography, CircularProgress } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import Cat from "../assets/cat.jpg";
import api from '../api';

const CatBreedIdentifier = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [breed, setBreed] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      setLoading(true);

      const formData = new FormData();
      formData.append('image', selectedFile);

      api.post("/api/cat-breed/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          setBreed(response.data.data.breed);
        })
        .catch(error => {
          console.error('Error:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleOpenUploader = () => {
    fileInputRef.current.click();
  };

  const handleSavePhoto = () => {
    if (selectedFile) {
      setLoading(true);

      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('breed_id', breed.id); // Assuming breed ID is available as breedName.id

      api.post("/api/cat-breed-gallery/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          // Handle success if needed
        })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: "column" }}>
      <Card sx={{ maxWidth: 345, marginTop: '10px' }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <CardMedia
              component="img"
              height="100%"
              width="100%"
              image={selectedFile ? URL.createObjectURL(selectedFile) : Cat}
              alt="Uploaded"
            />
          </Typography>
        </CardContent>
      </Card>

      <Button variant="outlined" startIcon={<PhotoCamera />} onClick={handleOpenUploader} sx={{ marginTop: '10px' }}>
        Select a photo
      </Button>
      
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />

      {selectedFile && (
        <Button onClick={handleUpload} disabled={loading}>
          {loading ? (
            <CircularProgress size={20} />
          ) : (
            'Upload'
          )}
        </Button>
      )}

      {breed && (
        <Box sx={{ marginTop: '10px' }}>
          <Typography variant="body2" color="text.secondary">
            Cat breed: {breed.name}
          </Typography>
          <Button onClick={handleSavePhoto} disabled={!breed || loading}>
            Save
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CatBreedIdentifier;
