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
import { ToastContext, withNavigation } from './helper';
import colours from './colours.json';

class Menu extends React.Component {
    startGame = async (toast) => {
        let url = window.API_ENDPOINT + 'api/create-room'; 
        const res = await fetch(url, { 
            method: 'POST', 
            body: JSON.stringify({ username: this.props.username }),
            headers: {
                'content-type': 'application/json',
            },
        });
        
        let data = await res.json();
        if (res.status !== 200) {
            toast({
                title: data.error,
                status: 'error',
            });
        } else {
            this.props.setState({ roomcode: data.code, uid: data.uid });
            // console.log(data.uid)
            this.props.navigate('/room');
        }
    }

    joinGame = async (toast) => {
        let url = window.API_ENDPOINT + 'api/join-room'; 
        const res = await fetch(url, { 
            method: 'POST', 
            body: JSON.stringify({ 
                username: this.props.username,
                code: parseInt(this.props.roomcode),
            }),
            headers: {
                'content-type': 'application/json',
            },
        });
        
        let data = await res.json();
        if (res.status !== 200) {
            toast({
                title: data.error,
                status: 'error',
            });
        } else {
            this.props.setState({ uid: data.uid });
            this.props.navigate('/room');
        }
    }
    
    render() {

        return (
            <SlideFade in unmountOnExit>
                <Box height={500} width={500}>
                    <Logo width='100%' size='2xl' />
                    <ToastContext.Consumer>
                        {(toast) => (
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
                                <Textbox 
                                    size='lg' 
                                    placeholder='username' 
                                    color='gray.700' 
                                    maxLength={30} 
                                    onChange={e => this.props.setState({username: e.target.value})} 
                                    value={this.props.username}
                                />
                                <HStack mt={4} height={150} width='100%' spacing='20px'>
                                    <Button 
                                        fontWeight={500}
                                        height='100%' 
                                        width={220} 
                                        colorScheme='teal' 
                                        bg={colours.bg2} 
                                        fontSize={18}
                                        onClick={() => this.startGame(toast)}
                                    >
                                        new room
                                    </Button>
                                    <Box height='100%' width={220}>
                                        <Textbox 
                                            placeholder='room code' 
                                            color='gray.700' 
                                            height='40px' 
                                            maxLength='6'
                                            onChange={e => this.props.setState({roomcode: e.target.value})} 
                                            value={this.props.roomcode}
                                        />
                                        <Button 
                                            fontWeight={500}
                                            mt={2} 
                                            width='100%' 
                                            height='102px' 
                                            colorScheme='green' 
                                            bg={colours.highlight}
                                            onClick={() => this.joinGame(toast)}
                                        >
                                            join room
                                        </Button>
                                    </Box>
                                </HStack>
                            </Box>
                        )}
                    </ToastContext.Consumer>
                </Box>
            </SlideFade >
        )
    }
}

export default withNavigation(Menu);

/*
if i decide to use the description thing:
<Text mt={7} opacity={0.9} fontSize='sm'>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta sed nisi nec vulputate. 
    Pellentesque sapien est, facilisis a venenatis nec, elementum non nunc. Suspendisse potenti. 
    Sed lobortis quam nec nisi euismod, eget condimentum risus finibus.
</Text>
*/
