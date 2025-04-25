import React from 'react';

const VideoPlayer = ({ filename }) => {
  const videoUrl = `/api/videos/${filename}`; // Backend route for serving videos

  return (
    <div>
      <video controls width="600">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;