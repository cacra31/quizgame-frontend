// src/pages/login.tsx
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

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('로그인 시도:', { email, password });
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
          {/* 상단 타이틀 */}
          <Box textAlign="center">
            <Heading size="lg" mb={1}>
              🎮 Quiz Game
            </Heading>
            <Text fontSize="sm" color="gray.500">
              로그인 후 퀴즈를 시작하세요
            </Text>
          </Box>

          {/* 폼 */}
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

          {/* 하단 링크 */}
          <Stack gap={2} fontSize="sm" textAlign="center">
            <Text color="gray.500">
              아직 계정이 없나요?{' '}
              <Link color="teal.500" href="#">
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
