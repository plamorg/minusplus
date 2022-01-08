import React from 'react';
import {
    Box,
    SlideFade,
} from '@chakra-ui/react';
import colours from './colours.json';

export default class Indicator extends React.Component {
    render() {
        return (
            <SlideFade in unmountOnExit>
                <Box h={this.props.size} w={this.props.size} borderRadius={1000} backgroundColor={this.props.on ? colours.highlight : 'gray.300'} />
            </SlideFade>
        )
    }
}