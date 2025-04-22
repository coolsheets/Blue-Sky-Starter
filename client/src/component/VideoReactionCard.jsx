import React, { useEffect, useState, useCallback } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Button,
  Box,
  Stack,
  Snackbar,
  Alert,
  Rating,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';

export default function VideoReactionCard({ userId }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [reactions, setReactions] = useState([]);
  const [comment, setComment] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [liked, setLiked] = useState(false);
  const [star, setStar] = useState(0);
  
  const [videoFiles, setVideoFiles] = useState([]);

useEffect(() => {
  fetch('../public/jsonVideo/index.json')
    .then(res => res.json())
    .then(data => setVideoFiles(data))
    .catch(err => console.error('Failed to load videos', err));
}, []);



  const fetchReactions = useCallback(async () => {
    if (!selectedVideo) {
      console.error("No video selected");
      return;
    }

    try {
      const res = await fetch(`/api/reactions/${encodeURIComponent(selectedVideo)}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch reactions: ${res.statusText}`);
      }
      const data = await res.json();
      setReactions(data);
    } catch (error) {
      console.error("Failed to fetch reactions", error);
    }
  }, [selectedVideo]);

  useEffect(() => {
    if (selectedVideo) fetchReactions();
  }, [selectedVideo, fetchReactions]);

  // Removed duplicate fetchReactions declaration

  const handleReaction = async () => {
    try {
      await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Video_URL: selectedVideo,
          User_ID: userId,
          Reaction_Type: liked,
          Star: star,
          Comment: comment.trim(),
        }),
      });
      setComment('');
      setAlert({ open: true, message: 'Your reaction has been submitted!', severity: 'success' });
      fetchReactions();
    } catch (error) {
      console.error(error);
      setAlert({ open: true, message: 'Failed to submit reaction', severity: 'error' });
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Available Videos</Typography>
      <Stack direction="column" spacing={2}>
        {videoFiles.map((file, idx) => (
          <Button
            key={idx}
            variant="outlined"
            onClick={() => setSelectedVideo(file)}
          >
            {file}
          </Button>
        ))}
      </Stack>

      <Dialog open={Boolean(selectedVideo)} onClose={() => setSelectedVideo(null)} maxWidth="md" fullWidth>
        <DialogContent>
          <Box component="video" src={`../public/jsonVideo/${selectedVideo}`} controls width="100%" sx={{ mb: 2 }} />

          <Stack direction="row" spacing={2}>
            <IconButton onClick={() => setLiked(!liked)} color={liked ? 'primary' : 'default'}>
              <ThumbUpIcon />
            </IconButton>
            <IconButton>
              <ShareIcon />
            </IconButton>
            <Rating
              name="star-rating"
              value={star}
              onChange={(event, newValue) => setStar(newValue)}
              max={5}
            />
          </Stack>

          <TextField
            label="Write a comment"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button variant="contained" sx={{ mt: 1 }} onClick={handleReaction}>
            Submit Reaction
          </Button>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Reactions:</Typography>
            {reactions.map((r, i) => (
              <Typography key={i} variant="body2">
                {r.User_ID}: {r.Reaction_Type ? 'Liked' : 'Disliked'}, {r.Star}★, "{r.Comment}"
              </Typography>
            ))}
          </Box>
        </DialogContent>
           <DialogActions>
          <Button onClick={() => {
            setSelectedVideo(null);
            setLiked(false);
            setStar(0);
            setComment('');
            setReactions([]);
          }} color="secondary">
            Close
          </Button>
        </DialogActions>

      </Dialog>

      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
// This code defines a React component that allows users to react to videos by liking, disliking, and commenting. It uses Material-UI for styling and layout. The component fetches reactions from the server and displays them in a dialog when a video is selected. Users can submit their reactions, which are then sent to the server. The component also includes a Snackbar for displaying alerts to the user.

// The component is designed to be reusable and can be integrated into a larger application. It uses hooks like useState and useEffect to manage state and side effects. The video files are hardcoded for demonstration purposes, but they can be replaced with dynamic data from a server or database. The component is styled using Material-UI components like Box, Stack, Typography, and Button.
// The video is displayed using the HTML <video> element, and the reactions are displayed in a list format. The component also includes a rating system using Material-UI's Rating component, allowing users to rate the video on a scale of 1 to 5 stars. The component is designed to be user-friendly and provides feedback through alerts when actions are performed.

// This component is a video reaction card that allows users to react to a video and post comments. It fetches reactions from the server, handles user interactions, and displays alerts for feedback.


// <Box component="video" src="../public/videos/001.mp4" controls width="100%" />
{/* {videoUrl} */ } /* Uncomment this line to display the video URL and replace at src=" " */

/*  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        await fetch('/api/comments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ Video_URL: videoUrl, User_ID: userId, Comment_Text: comment.trim() }),
        });
        setComments([...comments, comment.trim()]);
        setComment('');
        setAlert({ open: true, message: 'Comment posted!', severity: 'success' });
      } catch (err) {
        console.error(err);
        setAlert({ open: true, message: 'Failed to post comment', severity: 'error' });
      }
    }
  }; 
  
  */
//===========================Need to be added to setVideoFiles========================
 /*
useEffect(() => {
  fetch('/videos/index.json')
    .then(res => res.json())
    .then(data => setVideoFiles(data))
    .catch(err => console.error('Failed to load videos', err));
}, []);

// ==========
 Below will be for videos/index.json

[
  "001.mp4",
  "002.mp4",
  "0033.mp4"
]

*/
//=============================================================