import React from 'react';
import {
  Flex,
  Box,
  Heading,
  Text,
  Stack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function UserProfile() {
  const User = useSelector(state => state.reservas.user)
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        {/* <Center>
          <Avatar size="xl" src="https://bit.ly/sage-adebayo">
            <AvatarBadge
              as={IconButton}
              size="sm"
              rounded="full"
              top="-10px"
              colorScheme="red"
              aria-label="remove Image"
              icon={<SmallCloseIcon />}
            />
          </Avatar>
        </Center> */}
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          {User?.username}
        </Heading>
        <Text fontSize="lg" color="gray.600">
        {User?.email}
        </Text>
        <Text fontSize="lg" color="gray.600">
        {User?.telefono}
        </Text>
          <Button as={NavLink} to={"/"} bgColor={"blue.500"} colorScheme='whiteSmoke' >Inicio</Button>
      </Stack>
    </Flex>
  );
}
