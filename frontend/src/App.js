import React from 'react';
import Menu from './Menu';
import Room from './Room';
import Game from './Game';
import {
    Box,
} from '@chakra-ui/react';
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
                    <Routes>
                        <Route path='/' element={<Menu username={this.state.username} roomcode={this.state.roomcode} setState={e => this.setState(e)} />} />
                        <Route path='/room' element={<Room username={this.state.username} roomcode={this.state.roomcode} setState={e => this.setState(e)} />} />
                        <Route path='/game' element={<Game username={this.state.username} roomcode={this.state.roomcode} setState={e => this.setState(e)} />} />
                    </Routes>
                </BrowserRouter>
            </Box>
        );
    }
}
