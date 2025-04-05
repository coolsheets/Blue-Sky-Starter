import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import axios from 'axios';
import './ShuffleGallery.css';

const ShuffleGallery = () => {
  const [shuffleImages, setShuffleImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/shuffles')
      .then(response => setShuffleImages(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="shuffle-gallery">
      {shuffleImages.map((image, index) => (
        <Draggable key={index}>
          <div className="shuffle-card">
            <img src={image.url} alt={image.title} />
            <div className="shuffle-caption">{image.title}</div>
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default ShuffleGallery;
