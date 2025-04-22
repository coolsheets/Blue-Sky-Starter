// import React from "react";
// import Navbar from "./Navbar.jsx";
// import "./FrontPage.css";
// import Footer from "./Footer.jsx";
// import VideoReactionCard from "./component/VideoReactionCard.jsx";

// import { useEffect, useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
//   TextField,
//   Button,
//   Box,
//   Stack,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ShareIcon from '@mui/icons-material/Share';


// const FrontPage = () => {
//   const videoFiles = [
//     "003.mp4",
//     "006.mp4",
//     "009.mp4"
//   ];
//   const [reactions, setReactions] = useState([]);
//     const [comment, setComment] = useState('');
//   const [comments, setComments] = useState([]);
//   const [ toggle, setToggle ] = useState(false);

//   const showReactions = () => {
//     setToggle(!toggle);
//   };

//     const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
//    const handleReaction = async (type) => {
//     try {
//       await fetch('/api/reactions', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ Video_URL: videoUrl, Reaction_Type: type }),
//       });
//       fetchReactions();
//       setAlert({ open: true, message: `You reacted with '${type}'`, severity: 'success' });
//     } catch (error) {
//       console.error(error);
//       setAlert({ open: true, message: 'Failed to react', severity: 'error' });
//     }
//   };

//    useEffect(() => {
//       fetchReactions();
//    }, []);
  
//    const fetchReactions = async () => {
//     try {
//       const res = await fetch(`/api/reactions/${encodeURIComponent(videoUrl)}`);
//       const data = await res.json();
//       setReactions(data);
//     } catch (error) {
//       console.error('Failed to fetch reactions', error);
//     }
//   };

  

//   return (
//     <div className="front-page-container">
//       {/* Navbar */}
//       <Navbar />

//       {/* Title Picture Section */}
//       <header className="title-picture">
//         <img src="/img/calgary2.jpg" alt="Scenic Calgary" className="title-picture-image" />
//         <div className="title-picture-text">
//           <p>Explore City timelaps</p>
//           <h1>Choose <span> the best one</span></h1>
//           {/* <button>Vote</button> */}
//         </div>
//       </header>

//           <VideoReactionCard>
            
//           </VideoReactionCard>
//       {/* Video Thumbnails */}
//       <section className="video-preview">
//         {videoFiles.map((file, index) => (
//           <div key={index} className="video-card" onClick={() => showReactions()}>
//             <video src={`/videos/${file}`} muted loop autoPlay />
            
//             { toggle ? 

//             <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
//           <IconButton onClick={() => handleReaction('like')}>
//             <ThumbUpIcon />
//           </IconButton>
//           <IconButton onClick={() => handleReaction('heart')}>
//             <FavoriteIcon color="error" />
//           </IconButton>
//           <IconButton onClick={() => handleReaction('share')}>
//             <ShareIcon />
//           </IconButton>
//         </Stack> : null }
//           </div>
//         ))}
//       </section>
//       <Footer />
//     </div>
//   );
// };

// export default FrontPage;