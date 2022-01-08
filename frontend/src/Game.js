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
import { withNavigation } from './helper';
import colours from './colours.json';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: [],
            countdown: 30,
            result: {
                guesses: {},
                playerScores: {},
            },
            guesses: ["", "", ""],
            idle: 0,
            isIdle: false,
        }
    }

    componentDidMount = () => {
        this.props.socket.on('error', e => this.props.toast({title: e.error, status: 'error'}));
        this.props.socket.on('round-start', data => this.handleData(data));
        this.props.socket.on('round-update', data => {
            let submitted = [...this.state.submitted];
            submitted.push(data.username);
            this.setState({ submitted });
        })
        this.props.socket.on('round-end', res => this.handleEnd(res));
        this.handleData(this.props.round);
    }

    componentWillUnmount = async () => {
        this.props.socket.removeAllListeners();
    }

    handleData = (round) => {
        if (this.unsub) clearInterval(this.unsub);
        this.props.setState({ round });
        this.setState({ countdown: round.timeLeft, guesses: ["", "", ""], submitted: [], isIdle: false, });
        this.unsub = setInterval(() => {
            this.setState({ countdown: Math.max(0, this.state.countdown - 1) });
        }, 1000)
    }

    setGuesses = (index, e) => {
        let guesses = [...this.state.guesses];
        guesses[index] = e.target.value;
        this.setState({ guesses });
    }

    handleSubmit = () => {
        this.props.socket.emit('round-submit', { words: this.state.guesses });
    }

    handleEnd = (result) => {
        if (this.unsub) clearInterval(this.unsub);
        this.setState({ result, idle: 5, isIdle: true, });
        this.unsub = setInterval(() => {
            this.setState({ idle: Math.max(0, this.state.idle - 1) });
        }, 1000)
   }

    render() {
        return (
            <SlideFade in unmountOnExit>
                <Box h='100vh' w='100vw' p={5} display='flex'>
                        <Box h='100%' w='70%' bg='rgba(255, 255, 255, 0.95)' borderRadius={6} p={12} color='gray.700'>
                            <Box w='100%' display='flex' justifyContent='space-between'>
                                <Logo color='gray.500' size='md' />
                                <Heading size='md' fontWeight={600} color='gray.600'>{this.state.isIdle ? this.state.idle : this.state.countdown}</Heading>
                            </Box>
                            <Text mt={14}>
                                question {this.props.round.roundNumber} out of 5
                            </Text>
                            <Heading mt={4} size='3xl' fontWeight={600} fontStyle='italic' fontFamily='PT Serif'>
                                {this.props.round.word}
                            </Heading>
                            {
                            (!this.state.isIdle) ?
                                <>
                                    <Text mt={4}>
                                        type in the expression that you think will yield this word!
                                    </Text>
                                    <HStack mt='100px' spacing={3}>
                                        <Textbox value={this.state.guesses[0]} onChange={e => this.setGuesses(0, e)} bg='gray.200' _focus={{border: '1px solid rgba(0, 0, 0, 0.1)', backgroundColor: 'white'}} />
                                        <Heading size='md' fontWeight={400}>-</Heading>
                                        <Textbox value={this.state.guesses[1]} onChange={e => this.setGuesses(1, e)} bg='gray.200' _focus={{border: '1px solid rgba(0, 0, 0, 0.1)', backgroundColor: 'white'}} />
                                        <Heading size='md' fontWeight={400}>+</Heading>
                                        <Textbox value={this.state.guesses[2]} onChange={e => this.setGuesses(2, e)} bg='gray.200' _focus={{border: '1px solid rgba(0, 0, 0, 0.1)', backgroundColor: 'white'}} />
                                    </HStack>
                                    <Button colorScheme='teal' bg={colours.bg2} mt={8} onClick={this.handleSubmit} isDisabled={(this.state.submitted.indexOf(this.props.username)) !== -1}>
                                        submit 
                                    </Button>
                                </> :
                                <Box mt={16}>
                                    <Heading mb={4} size='lg'>guesses</Heading>
                                    {
                                        this.props.data.players.map((data, i) => (
                                            <Box display='flex' key={i} alignItems='center'>
                                                <Heading mr={4} size='sm'>{data}</Heading>
                                                <Text fontFamily='PT Serif'>
                                                    {(this.state.result.guesses[data] || [''])[0]} - {(this.state.result.guesses[data] || [''])[1]} + {(this.state.result.guesses[data] || [''])[2]}
                                                </Text>
                                            </Box>

                                        ))
                                    }
                                    <SlideFade in={(this.state.isIdle && this.props.round.roundNumber === 5)}>
                                        <Button colorScheme='teal' bg={colours.bg2} mt={10} onClick={() => this.props.navigate('/')} >
                                            back to home
                                        </Button>
                                    </SlideFade>
                                </Box>
                            }
                        </Box>


                    <VStack h='100%' w='30%' ml={4} spacing={4}>
                        {
                            this.props.data.players.sort((a, b) => (this.state.result.playerScores[b] || 0) - (this.state.result.playerScores[a] || 0)).map((e, i) =>
                                <UserCard key={i} username={e} score={this.state.result.playerScores[e] || 0} on={this.state.submitted.indexOf(e) !== -1} />
                            )
                        }
                    </VStack>
                </Box>
            </SlideFade>

        );
    }
}

export default withNavigation(Game);