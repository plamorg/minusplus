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
                        <Route path='/' element={<Menu />} />
                        <Route path='/room' element={<Room />} />
                        <Route path='/game' element={<Game />} />
                    </Routes>
                </BrowserRouter>
            </Box>
        );
    }
}
