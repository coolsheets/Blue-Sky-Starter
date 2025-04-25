import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Stack,
  Snackbar,
  Alert,
  Rating,
  Popover,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import './VideoReactionCard.css';

export default function VideoReactionCard({ videoUrl }) {
  const [selectedVideo, setSelectedVideo] = useState(videoUrl);
  const [videoFiles, setVideoFiles] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [star, setStar] = useState(0);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetch('/api/videos')
      .then(res => res.json())
      .then(data => {
        const filenames = data.map(v => v.filename);
        setVideoFiles(filenames);
        if (!videoUrl && filenames.length > 0) {
          const randomIndex = Math.floor(Math.random() * filenames.length);
          setSelectedVideo(filenames[randomIndex]);
        }
      })
      .catch(err => console.error('Failed to load videos', err));
  }, [videoUrl]);

  useEffect(() => {
    if (selectedVideo) {
      const fetchReactions = async () => {
        try {
          const response = await fetch(`/api/reactions/${encodeURIComponent(selectedVideo)}`);
          if (response.ok) {
            const data = await response.json();
            setReactions(data);
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

  const handleShareClick = (event) => setAnchorEl(event.currentTarget);
  const handleShareClose = () => setAnchorEl(null);
  const shareUrl = `${window.location.origin}/videos/${selectedVideo}`;

  return (
    <Box className="video-reaction-wrapper">
      <Typography variant="h5" sx={{ mb: 2 }}>
        Timelapse Video
      </Typography>

      {selectedVideo && (
        <Box sx={{ position: 'relative' }}>
          <video src={`/videos/${selectedVideo}`} controls />

          <button
            className="video-nav-button left"
            onClick={() => {
              const currentIndex = videoFiles.indexOf(selectedVideo);
              const prevIndex = (currentIndex - 1 + videoFiles.length) % videoFiles.length;
              setSelectedVideo(videoFiles[prevIndex]);
            }}
          >
            ◀
          </button>
          <button
            className="video-nav-button right"
            onClick={() => {
              const currentIndex = videoFiles.indexOf(selectedVideo);
              const nextIndex = (currentIndex + 1) % videoFiles.length;
              setSelectedVideo(videoFiles[nextIndex]);
            }}
          >
            ▶
          </button>
        </Box>
      )}

<Stack
  direction="row"
  spacing={2}
  alignItems="center"
  justifyContent="center"
  sx={{ mt: 2 }}
>
  <IconButton
    onClick={() => setLiked(!liked)}
    color={liked ? 'primary' : 'default'}
    aria-label="like"
  >
    <ThumbUpIcon />
  </IconButton>

  <IconButton
    onClick={handleShareClick}
    aria-label="share"
  >
    <ShareIcon />
    </IconButton>

      <Rating
      name="star-rating"
      value={star}
      onChange={(event, newValue) => setStar(newValue)}
      max={5}
      size="medium"
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

      <button
        className="submit-reaction-button"
        onClick={async () => {
          if (!selectedVideo || !comment.trim()) {
            setAlert({ open: true, message: 'Please select a video and write a comment.', severity: 'warning' });
            return;
          }

          try {
            const payload = {
              Video_URL: selectedVideo,
              User_ID: 1,
              Reaction_Type: "like",
              Star: star,
              Comment: comment.trim(),
            };

            const response = await fetch('/api/reactions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
              body: JSON.stringify(payload),
            });

            if (response.ok) {
              setAlert({ open: true, message: 'Reaction submitted successfully!', severity: 'success' });
              setComment('');
              setStar(0);
              setLiked(false);
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
      </button>

      <Box className="reaction-list">
        <Typography variant="subtitle2">Reactions:</Typography>
        {reactions.length > 0 ? (
          reactions.map((r, i) => (
            <Typography key={i} variant="body2">
              {r.Star}★ — "{r.Comment}"
            </Typography>
          ))
        ) : (
          <Typography variant="body2">No reactions yet.</Typography>
        )}
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleShareClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <List>
          <ListItem button component="a" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank">
            <ListItemText primary="Share on Facebook" />
          </ListItem>
          <ListItem button component="a" href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}`} target="_blank">
            <ListItemText primary="Share on LinkedIn" />
          </ListItem>
          <ListItem button component="a" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`} target="_blank">
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
