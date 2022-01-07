import React from 'react';
import {
    Input,
} from '@chakra-ui/react';

export default class Textbox extends React.Component {
    render() {
        return (
            <Input
                border='none'
                variant='filled'
                {...this.props} 
            />
        )
    }
}