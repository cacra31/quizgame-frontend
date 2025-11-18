import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  Field,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.50"
    >
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
              🎮 Quiz Game
            </Heading>
            <Text fontSize="sm" color="gray.500">
              로그인 후 퀴즈를 시작하세요
            </Text>
          </Box>
          <Box as="form" onSubmit={handleSubmit}>
            <Stack gap={4}>
              <Field.Root>
                <Field.Label>이메일</Field.Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>비밀번호</Field.Label>
                <Input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field.Root>

              <Button
                type="submit"
                colorScheme="teal"
                size="md"
                w="100%"
              >
                로그인
              </Button>
            </Stack>
          </Box>
          <Stack gap={2} fontSize="sm" textAlign="center">
            <Text color="gray.500">
              아직 계정이 없나요?{' '}
              <Link color="teal.500" onClick={() => navigate('/signup')}>
                회원가입
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
};

export default LoginPage;
