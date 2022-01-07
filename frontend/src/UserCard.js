import React from 'react';
import Indicator from './Indicator';
import {
    Box,
    Heading,
    SlideFade,
} from '@chakra-ui/react';

export default class UserCard extends React.Component {
    render() {
        return (
            <SlideFade style={{width: '100%'}} in unmountOnExit>
                <Box width='100%' bg='rgba(255, 255, 255, 0.9)' borderRadius={6} color='gray.600' p={3}>
                    <Box display='flex' justifyContent='space-between' idth='100%'>   
                        <Heading fontSize='md' fontWeight={500}>{this.props.username}</Heading>
                        <Indicator size={3} on={this.props.on} />
                    </Box>
                    <Heading fontSize='xl' fontWeight={700} mt={3}>{this.props.score}</Heading>
                </Box>
            </SlideFade>
        );
    }
}