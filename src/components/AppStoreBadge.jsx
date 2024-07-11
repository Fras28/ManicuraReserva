// AppStoreBadge.jsx
import React from 'react';
import { Box } from '@chakra-ui/react';

const AppStoreBadge = () => {
  return (
    <Box as="a" href="https://www.apple.com/app-store/">
      <img src="path/to/appstore-badge.png" alt="App Store" />
    </Box>
  );
};

export default AppStoreBadge;
