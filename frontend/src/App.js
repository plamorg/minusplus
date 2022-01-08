import React from 'react';
import Menu from './Menu';
import Room from './Room';
import Game from './Game';
import {
    Box,
} from '@chakra-ui/react';
import { ToastContext } from './helper';

import {
    Route,
    Routes,
    BrowserRouter,
} from 'react-router-dom';
import colours from './colours.json';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            roomcode: '',
            socket: null,
            uid: '',
            data: {
                ready: [],
                players: [],
            },
            round: {},
        }
    }

    render() {
        return (
            <Box 
                w='100vw'
                h='100vh'
                display='flex'
                alignItems='center'
                justifyContent='center'
                bg={colours.bg}
            >   
                <BrowserRouter>
                <ToastContext.Consumer>
                    {(toast) => (
                        <Routes>
                            <Route path='/' element={
                                <Menu 
                                    username={this.state.username} 
                                    roomcode={this.state.roomcode} 
                                    socket={this.state.socket} 
                                    uid={this.state.uid}
                                    data={this.state.data}
                                    setState={e => this.setState(e)} 
                                />
                            }/>
                            <Route path='/room' element={
                                <Room 
                                    username={this.state.username} 
                                    roomcode={this.state.roomcode} 
                                    socket={this.state.socket} 
                                    uid={this.state.uid}
                                    data={this.state.data}
                                    setState={e => this.setState(e)} 
                                    toast={toast}
                                    round={this.state.round}
                                />
                            } />
                            <Route path='/game' element={
                                <Game
                                    username={this.state.username} 
                                    roomcode={this.state.roomcode} 
                                    socket={this.state.socket} 
                                    uid={this.state.uid}
                                    data={this.state.data}
                                    setState={e => this.setState(e)} 
                                    toast={toast}
                                    round={this.state.round}
                                />
                            } />
                        </Routes>
                    )}
                </ToastContext.Consumer>
                    
                </BrowserRouter>
            </Box>
        );
    }
}
