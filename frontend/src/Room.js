import React from 'react';
import Logo from './Logo';
import UserCard from './UserCard';
import Indicator from './Indicator';
import {
    Box,
    Heading, 
    Text,
    VStack,
    HStack,
    SlideFade,
    Button,
} from '@chakra-ui/react';
import colours from './colours.json';

export default class Room extends React.Component {
    render() {
        return (
            <SlideFade in unmountOnExit>
                <Box h='100vh' w='100vw' p={5} display='flex'>
                    <Box h='100%' w='70%' bg='rgba(255, 255, 255, 0.95)' borderRadius={6} p={12} color='gray.700'>
                        <Logo color='gray.500' size='md' />
                        <Heading mt={10} size='4xl' fontWeight={800}>
                            186 235
                        </Heading>
                        <Text mt={4}>
                            share this code with your friends to invite them to this room.
                        </Text>
                        <HStack spacing={5} mt='100px'>
                            <Indicator size={10} on />
                            <Indicator size={10} on />
                            <Indicator size={10} />
                            <Indicator size={10} />
                            <Indicator size={10} />
                        </HStack>
                        <Text mt={5} fontSize='sm' color='gray.600'>
                            2 participants out of 5 are ready. 3 needed to start the game.
                        </Text>
                        <Button colorScheme='teal' bg={colours.bg2} mt={8}>
                            ready
                        </Button>
                    </Box>
                    
                    <VStack h='100%' w='30%' ml={4} spacing={4}>
                        <UserCard username='smjleo' score={1583} on/>
                        <UserCard username='virchau13' score={582} />
                        <UserCard username='claby2' score={581} />
                        <UserCard username='haoweiasmr' score={59} on/>
                        <UserCard username='lol' score={0}/>
                    </VStack>
                </Box>
            </SlideFade>
           
        );
    }
}