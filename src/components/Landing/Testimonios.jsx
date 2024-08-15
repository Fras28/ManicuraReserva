import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { FaStar } from 'react-icons/fa';

const Testimonial = ({ children }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }) => {
  return (
    <Heading as={'h3'} fontSize={'xl'} >
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }) => {
  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}>
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({ src, name, title }) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600} color={"whitesmoke"}>{name}</Text>
        <Text fontSize={'sm'} color={"whitesmoke"}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

const Rating = ({ rating }) => {
  return (
    <Flex>
      {[...Array(5)].map((_, i) => (
        <Icon
          key={i}
          as={FaStar}
          color={i < rating ? "yellow.400" : "gray.300"}
          w={4}
          h={4}
        />
      ))}
    </Flex>
  );
};

export default function WithSpeechBubbles() {
  return (
    <ParallaxProvider>
      <Box className='testimonios-content'>
        <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
          <Stack spacing={0} align={'center'}>
            <Heading color={'whitesmoke'}>Experiencias de nuestras clientas</Heading>
            <Text color={'whitesmoke'}>Descubre lo que dicen sobre nuestros servicios de belleza y estética</Text>
          </Stack>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={{ base: 10, md: 4, lg: 10 }}>
            <Parallax className="custom-class" y={[-20, 20]} tagOuter="figure">
              <Testimonial>
                <TestimonialContent>
                  <TestimonialHeading>Manicura perfecta</TestimonialHeading>
                  <Rating rating={5} />
                  <TestimonialText>
                    Me encantó mi experiencia en el salón. La manicura semipermanente quedó impecable y duró más de lo esperado. El personal fue muy amable y profesional.
                  </TestimonialText>
                </TestimonialContent>
                <TestimonialAvatar
                  src={
                    'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
                  }
                  name={'Laura Martínez'}
                  title={'Cliente satisfecha'}
                />
              </Testimonial>
            </Parallax>
            <Parallax className="custom-class" y={[-20, 20]} tagOuter="figure">
              <Testimonial>
                <TestimonialContent>
                  <TestimonialHeading>Lifting de pestañas increíble</TestimonialHeading>
                  <Rating rating={5} />
                  <TestimonialText>
                    El lifting de pestañas superó mis expectativas. Mis pestañas lucen naturalmente largas y curvadas. La esteticista fue muy cuidadosa y el resultado es asombroso.
                  </TestimonialText>
                </TestimonialContent>
                <TestimonialAvatar
                  src={
                    'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
                  }
                  name={'Sofía Rodríguez'}
                  title={'Influencer de belleza'}
                />
              </Testimonial>
            </Parallax>
            <Parallax className="custom-class" y={[-20, 20]} tagOuter="figure">
              <Testimonial>
                <TestimonialContent>
                  <TestimonialHeading>Perfilado de cejas perfecto</TestimonialHeading>
                  <Rating rating={4} />
                  <TestimonialText>
                    El perfilado de cejas transformó mi rostro. La forma es exactamente lo que quería y el proceso fue rápido y sin dolor. Muy contenta con el resultado.
                  </TestimonialText>
                </TestimonialContent>
                <TestimonialAvatar
                  src={
                    'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
                  }
                  name={'Carolina López'}
                  title={'Cliente frecuente'}
                />
              </Testimonial>
            </Parallax>
          </Stack>
        </Container>
      </Box>
    </ParallaxProvider>
  );
}