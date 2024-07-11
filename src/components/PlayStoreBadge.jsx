// PlayStoreBadge.jsx
import React from 'react';
import { Box } from '@chakra-ui/react';

const PlayStoreBadge = () => {
  return (
    <Box as="a" href="https://play.google.com/store">
      <img src="path/to/playstore-badge.png" alt="Play Store" />
    </Box>
  );
};

export default PlayStoreBadge;
