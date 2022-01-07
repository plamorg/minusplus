import React from 'react';
import {
    Box,
    Heading,
} from '@chakra-ui/react';

export default class Logo extends React.Component {
    render() {
        let {width, ...pog} = this.props
        return (
            <Box width={width} display={width && 'flex'} justifyContent='center'>
                <Heading 
                    color='white' 
                    opacity={0.95} 
                    userSelect='none'
                    fontWeight={600}
                    { ...pog }
                >
                    minusplus
                </Heading>
            </Box>
            
        )
    }
}