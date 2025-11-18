import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box
        bg="white"
        p={8}
        rounded="lg"
        boxShadow="lg"
        w="100%"
        maxW="400px"
      >
        <Stack gap={6}>
          <Box textAlign="center">
            <Heading size="lg" mb={1}>
              회원가입
            </Heading>
            <Text fontSize="sm" color="gray.500">
              퀴즈 게임을 시작할 계정을 만들어 보세요
            </Text>
          </Box>

          <Box as="form" onSubmit={handleSubmit}>
            <Stack gap={4}>
              <Box>
                <Text mb={1} fontSize="sm">
                  이메일
                </Text>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>

              <Box>
                <Text mb={1} fontSize="sm">
                  닉네임
                </Text>
                <Input
                  placeholder="닉네임을 입력하세요"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </Box>

              <Box>
                <Text mb={1} fontSize="sm">
                  비밀번호
                </Text>
                <Input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>

              <Button type="submit" colorScheme="teal" w="100%">
                회원가입
              </Button>
            </Stack>
          </Box>

          <Stack gap={2} fontSize="sm" textAlign="center">
            <Text color="gray.500">
              이미 계정이 있나요?{' '}
              <Link color="teal.500" onClick={() => navigate('/')}>
                로그인
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
};

export default SignupPage;
