import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Stack,
  Snackbar,
  Alert,
  Rating,
  Popover,
  List,
  ListItem,
  ListItemText,
  Badge,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import './VideoReactionCard.css';

export default function VideoReactionCard({ videoUrl }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoFiles, setVideoFiles] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [star, setStar] = useState(0);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [cameraNumber, setCameraNumber] = useState(null);
  const [cameraLocation, setCameraLocation] = useState(null);

  const isLoggedIn = !!localStorage.getItem("token");

  const extractFilename = (path) => path?.split('/').pop() || '';

  useEffect(() => {
    fetch('/api/videos')
      .then(res => res.json())
      .then(data => {
        const filenames = data.map(v => v.filename);
        setVideoFiles(filenames);

        if (videoUrl) {
          setSelectedVideo(extractFilename(videoUrl));
        } else if (filenames.length > 0) {
          const randomIndex = Math.floor(Math.random() * filenames.length);
          setSelectedVideo(filenames[randomIndex]);
        }
      })
      .catch(err => console.error('Failed to load videos', err));
  }, [videoUrl]);

  const loadReactions = (userId) => {
    if (!selectedVideo) return;

    fetch(`/api/reactions/${encodeURIComponent(selectedVideo)}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setReactions(data);

        if (userId) {
          const userLiked = data.some(r => r.Reaction_Type === 'like' && r.user === userId);
          setLiked(userLiked);
        } else {
          setLiked(false);
        }
      })
      .catch(err => console.error('Error fetching reactions:', err));
  };

  useEffect(() => {
    if (!selectedVideo) return;

    let userId = null;
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        userId = payload.userId;
      } catch (e) {
        console.error('Invalid token');
      }
    }

    loadReactions(userId);

    fetch('/api/videos')
      .then(res => res.json())
      .then(data => {
        const videoData = data.find(v => v.filename === selectedVideo);
        if (videoData) {
          setLikesCount(videoData.stats.likes);
          setCameraNumber(videoData.camera_number);
          setCameraLocation(videoData.camera_location);
        }
      });
  }, [selectedVideo]);

  const handleShareClick = (event) => setAnchorEl(event.currentTarget);
  const handleShareClose = () => setAnchorEl(null);
  const shareUrl = `${window.location.origin}/videos/${selectedVideo}`;

  const handleLike = async () => {
    if (!isLoggedIn) {
      setAlert({ open: true, message: 'You must be logged in to like videos.', severity: 'info' });
      return;
    }

    try {
      const res = await fetch(`/api/videos/${selectedVideo}/like`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (res.ok) {
        const updated = await res.json();
        setLikesCount(updated.stats.likes);
        setLiked(true);
      } else {
        throw new Error('You can only like it once.');
      }
    } catch (err) {
      console.error(err);
      setAlert({ open: true, message: 'You can only like it once.', severity: 'error' });
    }
  };

  const handleSubmitReaction = async () => {
    if (!isLoggedIn) {
      setAlert({ open: true, message: 'You must be logged in to submit a reaction.', severity: 'info' });
      return;
    }
    if (!selectedVideo || !comment.trim()) {
      setAlert({ open: true, message: 'Please select a video and write a comment.', severity: 'warning' });
      return;
    }

    try {
      const payload = {
        Video_URL: selectedVideo,
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

        const token = localStorage.getItem("token");
        let userId = null;
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            userId = payload.userId;
          } catch (e) {
            console.error('Invalid token');
          }
        }

        loadReactions(userId);
      } else {
        throw new Error('Failed to submit reaction');
      }
    } catch (error) {
      console.error(error);
      setAlert({ open: true, message: 'Failed to submit reaction. Please try again.', severity: 'error' });
    }
  };

  return (
    <Box className="video-reaction-wrapper">
      <Typography variant="h5" sx={{ mb: 2 }}>
        {cameraNumber !== null && cameraLocation
          ? `#${cameraNumber} - ${cameraLocation}`
          : 'Time-Lapse Video'}
      </Typography>

      {selectedVideo && (
        <Box sx={{ position: 'relative' }}>
          <video src={`/api/videos/${selectedVideo}`} controls />

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

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <IconButton
          onClick={handleLike}
          disabled={liked}
        >
          <Badge badgeContent={likesCount} color="secondary" showZero max={9999}>
            <FavoriteIcon sx={{ color: liked ? 'red' : 'gray' }} />
          </Badge>
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

      <button className="submit-reaction-button" onClick={handleSubmitReaction}>
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
