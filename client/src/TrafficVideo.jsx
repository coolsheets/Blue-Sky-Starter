import React from 'react';

const TrafficVideo = () => {
  return (
    <div>
      <h3>Traffic Camera Time-Lapse</h3>
      <video
        width="50%%"
        height="auto"
        controls
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="./videos/output_2x_looped.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default TrafficVideo;
