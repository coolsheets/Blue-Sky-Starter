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
  Popover,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import SharePopup from './SharePopup'; 

export default function VideoReactionCard({ userId }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [reactions, setReactions] = useState([]);
  const [comment, setComment] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [liked, setLiked] = useState(false);
  const [star, setStar] = useState(0);
  const [videoFiles, setVideoFiles] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null); // For Popover

  useEffect(() => {
    fetch('../public/jsonVideo/index.json')
      .then(res => res.json())
      .then(data => setVideoFiles(data))
      .catch(err => console.error('Failed to load videos', err));
  }, []);

  // Fetch reactions for the selected video
useEffect(() => {
  if (selectedVideo) {
    const fetchReactions = async () => {
      try {
        const response = await fetch(`/api/reactions/${encodeURIComponent(selectedVideo.split('/').pop())}`);
        if (response.ok) {
          const data = await response.json();
          setReactions(data); // Update the reactions state with the fetched data
        } else {
          console.error('Failed to fetch reactions');
        }
      } catch (error) {
        console.error('Error fetching reactions:', error);
      }
    };

    fetchReactions();
  }
}, [selectedVideo]);

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const shareUrl = `${window.location.origin}/videos/${selectedVideo}`; // Dynamically generate the full video URL

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Choose to play timelapse Videos</Typography>
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
          <Box sx={{ position: 'relative', mb: 2 }}>
            <Box component="video" src={`../videos/${selectedVideo}`} controls width="100%" />

            {/* Previous and Next Buttons */}
            <Button
              variant="contained"
              sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}
              onClick={() => {
                const currentIndex = videoFiles.indexOf(selectedVideo);
                const prevIndex = (currentIndex - 1 + videoFiles.length) % videoFiles.length;
                setSelectedVideo(videoFiles[prevIndex]);
              }}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
              onClick={() => {
                const currentIndex = videoFiles.indexOf(selectedVideo);
                const nextIndex = (currentIndex + 1) % videoFiles.length;
                setSelectedVideo(videoFiles[nextIndex]);
              }}
            >
              Next
            </Button>
          </Box>

          <Stack direction="row" spacing={2}>
            <IconButton onClick={() => setLiked(!liked)} color={liked ? 'primary' : 'default'}>
              <ThumbUpIcon />
            </IconButton>
            <IconButton onClick={handleShareClick}>
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
          <Button
  variant="contained"
  sx={{ mt: 1 }}
  onClick={async () => {
    if (!selectedVideo || !comment.trim()) {
      setAlert({ open: true, message: 'Please select a video and write a comment.', severity: 'warning' });
      return;
    }

    try {
      const payload = {
        Video_URL: selectedVideo.split('/').pop(), // Extract only the file name
        User_ID: 1, // Default user ID
        Reaction_Type: "like", // Default reaction type
        Star: star, // Star rating from UI
        Comment: comment.trim(), // Comment from UI
      };

      const response = await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token for authentication,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setAlert({ open: true, message: 'Reaction submitted successfully!', severity: 'success' });
        setComment(''); // Clear the comment field
        setStar(0); // Reset the star rating
        setLiked(false); // Reset the like state
      } else {
        throw new Error('Failed to submit reaction');
      }
    } catch (error) {
      console.error(error);
      setAlert({ open: true, message: 'Failed to submit reaction. Please try again.', severity: 'error' });
    }
  }}
>
  Submit Reaction
</Button>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Reactions:</Typography>
          {reactions.length > 0 ? (
            reactions.map((r, i) => (
              <Typography key={i} variant="body2">
                {/* User {r.User_ID}: {r.Reaction_Type ? 'Liked' : 'Disliked'}, {r.Star}★, "{r.Comment}" */}
                {r.Star}★, "{r.Comment}"
              </Typography>
            ))
          ) : (
            <Typography variant="body2">No reactions yet.</Typography>
          )}
        </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setSelectedVideo(null);
              setLiked(false);
              setStar(0);
              setComment('');
              setReactions([]);
            }}
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Popover for Share Options */}
      <Popover
  open={open}
  anchorEl={anchorEl}
  onClose={handleShareClose}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
>
  <List>
    <ListItem
      button
      component="a"
      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
      target="_blank"
    >
      <ListItemText primary="Share on Facebook" />
    </ListItem>
    <ListItem
      button
      component="a"
      href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}`}
      target="_blank"
    >
      <ListItemText primary="Share on LinkedIn" />
    </ListItem>
    <ListItem
      button
      component="a"
      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
      target="_blank"
    >
      <ListItemText primary="Share on Twitter" />
    </ListItem>
  </List>
</Popover>

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