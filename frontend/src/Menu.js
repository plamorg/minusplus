import React from 'react';
import Logo from './Logo';
import Textbox from './Textbox';
import {
    Box,
//   Text,
    SlideFade,
    Button,
    HStack,
} from '@chakra-ui/react';
import colours from './colours.json';


export default class Menu extends React.Component {
    render() {
        return (
            <SlideFade in unmountOnExit>
                <Box height={500} width={500}>
                    <Logo width='100%' size='2xl' />
                    <Box 
                        width='100%'
                        bg='white' 
                        mt={12} 
                        p={5} 
                        display='flex' 
                        flexDirection='column' 
                        alignItems='center'
                        borderRadius={6}
                    >
                        <Textbox size='lg' placeholder='username' color='gray.700' maxLength={30} />
                        <HStack mt={4} height={150} width='100%' spacing='20px'>
                            <Button 
                                fontWeight={500}
                                height='100%' 
                                width={220} 
                                colorScheme='teal' 
                                bg={colours.bg2} 
                                fontSize={18}
                            >
                                new room
                            </Button>
                            <Box height='100%' width={220}>
                                <Textbox placeholder='room code' color='gray.700' height='40px' maxLength='6'></Textbox>
                                <Button 
                                    fontWeight={500}
                                    mt={2} 
                                    width='100%' 
                                    height='102px' 
                                    colorScheme='green' 
                                    bg={colours.highlight}
                                >
                                    join room
                                </Button>
                            </Box>
                        </HStack>
                    </Box>
                </Box>
            </SlideFade >
        )
    }
}

/*
if i decide to use the description thing:
<Text mt={7} opacity={0.9} fontSize='sm'>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta sed nisi nec vulputate. 
    Pellentesque sapien est, facilisis a venenatis nec, elementum non nunc. Suspendisse potenti. 
    Sed lobortis quam nec nisi euismod, eget condimentum risus finibus.
</Text>
*/
