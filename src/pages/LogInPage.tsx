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
import { useLogin } from '@/hooks/useLogin';

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    loginMutation.mutate(
      { userId, password },
      {
        onSuccess: () => {
          navigate('/home');
        },
        onError: () => {
          setErrorMsg("아이디 또는 비밀번호를 확인해주세요.");
        },
      }
    );
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box bg="white" p={8} rounded="lg" boxShadow="lg" w="100%" maxW="400px">
        <Stack gap={6}>
          <Box textAlign="center">
            <Heading size="lg" mb={1}>
              🎮 Quiz Game
            </Heading>
          </Box>

          <Box as="form" onSubmit={handleSubmit}>
            <Stack gap={4}>
              <Field.Root>
                <Field.Label>아이디</Field.Label>
                <Input
                  placeholder="아이디를 입력하세요"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
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

              {errorMsg && (
                <Text color="red.500" fontSize="sm">
                  {errorMsg}
                </Text>
              )}

              <Button
                type="submit"
                colorScheme="teal"
                size="md"
                w="100%"
                loading={loginMutation.isPending}
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
