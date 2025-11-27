import { useRoomLeaveMutation } from "@/features/room/api/roomApi";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
const GamePage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const roomLeaveMutation = useRoomLeaveMutation();

  const handleRoomLeave = () => {
    roomLeaveMutation.mutate(
      undefined, {
      onSuccess: () => {
        navigate('/home', { replace: true });
      },
      onError: () => {
        navigate('/home', { replace: true });
      },
    },
    );
  }

  return (
    <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
      <Box bg="white" p={8} rounded="lg" boxShadow="lg" maxW="900px" w="100%">
        <Stack gap={6}>
          <Text>{gameId}</Text>
          <Button variant="outline" size="sm" onClick={handleRoomLeave}>
            방 떠나기
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default GamePage;
