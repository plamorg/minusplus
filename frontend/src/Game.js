import React from 'react';
import Logo from './Logo';
import UserCard from './UserCard';
import Textbox from './Textbox';
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

export default class Game extends React.Component {
    render() {
        return (
            <SlideFade in unmountOnExit>
                <Box h='100vh' w='100vw' p={5} display='flex'>
                    <Box h='100%' w='70%' bg='rgba(255, 255, 255, 0.95)' borderRadius={6} p={12} color='gray.700'>
                        <Box w='100%' display='flex' justifyContent='space-between'>
                            <Logo color='gray.500' size='md' />
                            <Heading size='md' fontWeight={600} color='gray.600'>30</Heading>
                        </Box>
                        <Text mt={14}>
                            question 1 out of 5
                        </Text>
                        <Heading mt={4} size='3xl' fontWeight={600} fontStyle='italic' fontFamily='PT Serif'>
                            duck
                        </Heading>
                        <Text mt={4}>
                            type in the expression that you think will yield this word!
                        </Text>
                        <HStack mt='100px' spacing={3}>
                            <Textbox bg='gray.200' _focus={{border: '1px solid rgba(0, 0, 0, 0.1)', backgroundColor: 'white'}} />
                            <Heading size='md' fontWeight={400}>-</Heading>
                            <Textbox bg='gray.200' _focus={{border: '1px solid rgba(0, 0, 0, 0.1)', backgroundColor: 'white'}} />
                            <Heading size='md' fontWeight={400}>+</Heading>
                            <Textbox bg='gray.200' _focus={{border: '1px solid rgba(0, 0, 0, 0.1)', backgroundColor: 'white'}} />
                        </HStack>
                        <Button colorScheme='teal' bg={colours.bg2} mt={8}>
                            submit
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