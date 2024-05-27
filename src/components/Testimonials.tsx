'use client'

import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react'
import { color } from 'framer-motion'

interface Props {
  children: React.ReactNode
}

const Testimonial = (props: Props) => {
  const { children } = props

  return <Box>{children}</Box>
}

const TestimonialContent = (props: Props) => {
  const { children } = props

  return (
    <Stack id='test'
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
  )
}

const TestimonialHeading = (props: Props) => {
  const { children } = props

  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  )
}

const TestimonialText = (props: Props) => {
  const { children } = props

  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}>
      {children}
    </Text>
  )
}

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string
  name: string
  title: string
}) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {title}
        </Text>
      </Stack>
    </Flex>
  )
}

export default function WithSpeechBubbles() {
  return (
    <Box bg={useColorModeValue('#Ffffff', 'gray.700') }>
      <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'} color={'#292864'} >
          <Heading>Que Dicen Nuestros Clientes</Heading>
          <Text>Trabajamos con clientes de todo el mundo</Text>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 4, lg: 10 }} color={'#292864'} >
          <Testimonial >
            <TestimonialContent >
              <TestimonialHeading>Una Experiencia Inolvidable</TestimonialHeading>
              <TestimonialText>
                El tour de vinos superó todas mis expectativas. Desde la primera bodega hasta la última copa, cada momento fue mágico. Los guías eran increíblemente conocedores y apasionados, lo que hizo que cada visita fuera educativa y entretenida.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
              }
              name={'Javier Martínez, Buenos Aires'}
              title={'CEO at ABC Corporation'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Descubrí Mi Vino Favorito</TestimonialHeading>
              <TestimonialText>
                Nunca pensé que encontraría mi vino perfecto en este tour. Las degustaciones fueron muy variadas y me dieron la oportunidad de probar vinos que nunca habría considerado.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
              }
              name={'Luciano Fernandez, Barcelona'}
              title={'CEO at ABC Corporation'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Un Viaje Gourmet y Cultural</TestimonialHeading>
              <TestimonialText>
                El tour de vinos fue una combinación perfecta de cultura, historia y gastronomía. Aprendimos sobre el proceso de elaboración del vino, visitamos bodegas históricas y disfrutamos de maridajes con exquisiteces locales.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
              }
              name={'María González, Ciudad de México'}
              title={'Designer at CAD co'}
            />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  )
}
