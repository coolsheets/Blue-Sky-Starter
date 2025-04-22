import React, { useState } from "react";
import Navbar from "./Navbar.jsx";
import "./FrontPage.css";
import Footer from "./Footer.jsx";
import VideoReactionCard from "./component/VideoReactionCard.jsx";
import { Dialog, DialogContent } from "@mui/material";


const FrontPage = () => {

   const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  // const videoFiles = [
  //   "003.mp4",
  //   "006.mp4",
  //   "009.mp4"
  // ];

  return (
    <div className="front-page-container">
      {/* Navbar */}
      <Navbar />

      {/* Title Picture Section */}
      <header className="title-picture">
        <img src="/img/calgary2.jpg" alt="Scenic Calgary" className="title-picture-image" />
        <div className="title-picture-text">
          <p>Explore City timelaps</p>
          <h1>Choose <span> the best one</span></h1>
          <button onClick={handleOpenModal}>Vote</button>
          {/* <button>Vote</button> */}
        </div>
      </header>

      {/* Video Thumbnails */}
      <section className="video-preview">
        {/* {videoFiles.map((file, index) => (
          <div key={index} className="video-card">
            <video src={`/videos/${file}`} muted loop autoPlay />
            <VideoReactionCard/>
          </div>
        ))} */}
        
        {/*         
        <VideoReactionCard userId={"user"} /> {/* Pass userId as a prop *//*}
           */}
          
        {/* Modal */}
      <Dialog
        open={open}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        classes={{ backdrop: "custom-dialog-backdrop" }}
      >
        <DialogContent className="custom-dialog-content">
          <VideoReactionCard videoUrl="/videos/003.mp4" />
        </DialogContent>
      </Dialog>

      </section>

      <Footer />
    </div>
  );
};

export default FrontPage;