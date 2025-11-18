import { Box, Button, Grid, Heading, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
      <Box bg="white" p={8} rounded="lg" boxShadow="lg" maxW="700px" w="100%">
        <Stack gap={4}>
          <Heading size="lg">메인 화면</Heading>
          <Grid templateColumns="repeat(3, 1fr)" gap="6">
            <Box p={4} bg="pink" rounded="lg" boxShadow="lg"/>
            <Box p={4} bg="pink" rounded="lg" boxShadow="lg"/>
            <Box p={4} bg="pink" rounded="lg" boxShadow="lg"/>
          </Grid>

          <Button colorScheme="teal" onClick={() => alert('게임 시작은 나중에 구현하자 😎')}>
            퀴즈 시작하기
          </Button>

          <Button variant="outline" onClick={() => navigate('/')}>
            로그아웃
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default HomePage;