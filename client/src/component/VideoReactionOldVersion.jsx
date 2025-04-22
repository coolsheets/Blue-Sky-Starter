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
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';

export default function VideoReactionCard({ videoUrl }) {
  const [reactions, setReactions] = useState([]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  // Wrap fetchReactions in useCallback to ensure stable reference
  const fetchReactions = useCallback(async () => {
    try {
      const res = await fetch(`/api/reactions/${encodeURIComponent(videoUrl)}`);
      const data = await res.json();
      setReactions(data);
    } catch (error) {
      console.error('Failed to fetch reactions', error);
    }
  }, [videoUrl]);

  useEffect(() => {
    fetchReactions();
  }, [fetchReactions]); // Include fetchReactions in the dependency array

  const handleReaction = async (type) => {
    try {
      await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Video_URL: videoUrl, Reaction_Type: type }),
      });
      fetchReactions();
      setAlert({ open: true, message: `You reacted with '${type}'`, severity: 'success' });
    } catch (error) {
      console.error(error);
      setAlert({ open: true, message: 'Failed to react', severity: 'error' });
    }
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, comment.trim()]);
      setComment('');
      setAlert({ open: true, message: 'Comment posted!', severity: 'success' });
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h6">Video</Typography>
        <Box component="video" src={videoUrl} controls width="100%" />

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <IconButton onClick={() => handleReaction('like')}>
            <ThumbUpIcon />
          </IconButton>
          <IconButton onClick={() => handleReaction('heart')}>
            <FavoriteIcon color="error" />
          </IconButton>
          <IconButton onClick={() => handleReaction('share')}>
            <ShareIcon />
          </IconButton>
        </Stack>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Reactions:
          {reactions.map((r, i) => (
            <span key={i}> {r.Reaction_Type} </span>
          ))}
        </Typography>

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
        <Button variant="contained" sx={{ mt: 1 }} onClick={handleCommentSubmit}>
          Post Comment
        </Button>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Comments:</Typography>
          {comments.map((c, idx) => (
            <Typography key={idx} variant="body2">- {c}</Typography>
          ))}
        </Box>
      </CardContent>

      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}