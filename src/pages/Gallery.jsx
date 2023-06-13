import React, { useEffect, useState } from 'react';
import api from '../api';

const CatGallery = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [breedFilter, setBreedFilter] = useState('');

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/cat-breed-gallery/');
      console.info(response.data.data)
      setCats(response.data.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching cats');
      setLoading(false);
    }
  };

  const handleBreedFilterChange = (event) => {
    setBreedFilter(event.target.value);
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    fetchCats();
  };

  return (
    <div>
      <h2>Cat Gallery</h2>

      <form onSubmit={handleFilterSubmit}>
        <label htmlFor="breedFilter">Filter by Breed:</label>
        <select id="breedFilter" value={breedFilter} onChange={handleBreedFilterChange}>
          <option value="">All</option>
          <option value="1">Siamese</option>
          <option value="2">Maine Coon</option>
          <option value="3">Persian</option>
          {/* Add more breed options as needed */}
        </select>
        <button type="submit">Apply Filter</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="cat-gallery">
          {cats.map((cat, index) => (
            <div key={index} className="cat-item">
              <img src={cat.image} alt={`Cat ${index + 1}`} />
              <p>Breed: {cat.breed}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CatGallery;
