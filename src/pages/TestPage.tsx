import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useTestStore } from '../stores/testStore'

const Test = () => {
    const [test, setTest] = useState('');
    const { testText, setTestText } = useTestStore();

    return (
        <Flex
            minH='100vh'
            align='center'
            justify='center'
        >
            <Box bg={'yellow'} p='10px'>
                <Text>{testText}</Text>
                <Button onClick={() => setTestText('ㅋㅋ')}>버튼</Button>
            </Box>
        </Flex>
    );
};

export default Test;
