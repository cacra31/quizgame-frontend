import { useLogoutMutation } from '@/features/auth/api/authMutation';
import useAuthStore from '@/features/auth/stores/authStore';
import { Box, Button, Grid, Heading, Stack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation();
  const useUserStore = useAuthStore();
  const handleLogout = async () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => navigate('/login', { replace: true }),
      onError: () => navigate('/login', { replace: true }),
    });
  };

  useEffect(() => {
    console.log(useUserStore.user);
  }, []);

  return (
    <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
      <Box bg="white" p={8} rounded="lg" boxShadow="lg" maxW="700px" w="100%">
        <Stack gap={4}>
          <Heading size="lg">메인 화면</Heading>
          <Grid templateColumns="repeat(3, 1fr)" gap="6">

          </Grid>
          <Button variant="outline" onClick={handleLogout}>
            로그아웃
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default HomePage;