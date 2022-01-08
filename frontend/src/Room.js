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
import { withNavigation } from './helper';
import colours from './colours.json';
import { io } from 'socket.io-client';

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            starting: false,
            countdown: 5,
        };
    }

    componentDidMount = async () => {
        let socket = io(window.API_ENDPOINT);
        socket.emit('identify', {
            uid: this.props.uid,
        });
        // console.log(this.props.uid)
        socket.on('room-info', data => this.handleData(data));
        socket.on('error', e => this.props.toast({title: e.error, status: 'error'}));
        this.props.setState({ socket });
    }

    componentWillUnmount = async () => {
        this.props.socket.removeAllListeners();
    }

    setReady = () => {
        let newReady = !this.state.ready;
        this.setState({ ready: newReady });
        this.props.socket.emit('status-update', {
            ready: newReady,
        });
    }

    handleData = (data) => {
        this.props.setState({ data });
        let amt = data.players.length
        let red = data.ready.length
        let threshold = Math.ceil(amt / 2);
        if (!this.state.starting && threshold <= red) this.setStarting();
        else if (this.state.starting && threshold > red) this.abortStarting();
    }

    setStarting = () => {
        this.setState({
            starting: true,
            countdown: 5,
        }, () => {
            this.unsub = setInterval(() => {
                if (this.state.countdown === 1) this.props.navigate('/game')
                this.setState({countdown: this.state.countdown-1});
            }, 1000);
        });
    }

    abortStarting = () => {
        if (this.unsub) clearInterval(this.unsub);
        this.setState({
            countdown: 5,  
            starting: false,
        })
    }
nag
    render() {
        let roomcode = this.props.roomcode.toString();
        roomcode = roomcode.slice(0, 3) + ' ' + roomcode.slice(3);

        let threshold = Math.ceil(this.props.data.players.length / 2);

        return (
            <SlideFade in unmountOnExit>
                <Box h='100vh' w='100vw' p={5} display='flex'>
                    <Box h='100%' w='70%' bg='rgba(255, 255, 255, 0.95)' borderRadius={6} p={12} color='gray.700'>
                        <Logo color='gray.500' size='md' />
                        <Heading mt={10} size='4xl' fontWeight={800}>
                           {roomcode} 
                        </Heading>
                        <Text mt={4}>
                            share this code with your friends to invite them to this room.
                        </Text>
                        <HStack spacing={5} mt='100px'>
                            {
                                this.props.data.players.map((e, i) => 
                                    <Indicator key={i} size={10} on={this.props.data.ready.length >= i+1} />
                                )
                            }
                        </HStack>
                        <Text mt={5} fontSize='sm' color='gray.600'>
                            {
                                this.state.starting ? 
                                `game starting in ${this.state.countdown} seconds`
                                : `${this.props.data.ready.length} participants out of ${this.props.data.players.length} are ready. ${threshold} needed to start the game.`
                            }
                        </Text>
                        <Button colorScheme='teal' bg={this.state.ready ? null : colours.bg2} mt={8} variant={this.state.ready ? 'outline' : 'solid'} onClick={this.setReady} >
                            {this.state.ready ? 'unready' : 'ready'}
                        </Button>
                    </Box>
                    
                    <VStack h='100%' w='30%' ml={4} spacing={4}>
                        {
                            this.props.data.players.map((e, i) =>
                                <UserCard key={i} username={e} score={0} on={this.props.data.ready.indexOf(e) !== -1} />
                            )
                        }
                    </VStack>
                </Box>
            </SlideFade>
           
        );
    }
}

export default withNavigation(Room);