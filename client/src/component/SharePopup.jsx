import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function SharePopup({ videoName }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const videoUrl = `${window.location.origin}/videos/${videoName}`;
  const shareText = `Check out this video: ${videoUrl}`;

  const handleShare = (platform) => {
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank');
    handleMenuClose();
  };

  return (
    <>
      <IconButton onClick={handleMenuClick}>
        <ShareIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleShare('facebook')}>
          <FacebookIcon sx={{ mr: 1 }} /> Share on Facebook
        </MenuItem>
        <MenuItem onClick={() => handleShare('twitter')}>
          <TwitterIcon sx={{ mr: 1 }} /> Share on Twitter
        </MenuItem>
        <MenuItem onClick={() => handleShare('whatsapp')}>
          <WhatsAppIcon sx={{ mr: 1 }} /> Share on WhatsApp
        </MenuItem>
      </Menu>
    </>
  );
}
