import { useRoomLeaveMutation, useRoomQuery } from "@/features/room/api/roomApi";
import { useWebSocket } from "@/shared/websocket/useWebSocket";
import type { UserDto } from "@/types/userType";
import { Box, Button, Separator, Spinner, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const GamePage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { subscribe } = useWebSocket();
  const roomLeaveMutation = useRoomLeaveMutation();
  const { data, isLoading, isError, refetch } = useRoomQuery(Number(roomId));
  const [users, setUsers] = useState<UserDto[]>([]);

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

  useEffect(() => {
    if (data?.users) {
      setUsers(data.users);
    }
  }, [data]);

  useEffect(() => {
    const subs = [
      subscribe(`/topic/room/${roomId}/users`, (users) => setUsers(users)),
      subscribe(`/topic/room/${roomId}/question`, (msg) => console.log('question', msg)),
      subscribe(`/topic/room/${roomId}`, (msg) => console.log('result', msg)),
    ];
    return () => {
      subs.forEach((s) => s?.unsubscribe());
    };
  }, [subscribe]);

  if (isLoading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner />
      </Box>
    );
  }

  // 에러 처리
  if (isError) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Stack gap={4} align="center">
          <Text>방 정보를 불러오지 못했습니다.</Text>
          <Button onClick={() => refetch()}>다시 시도</Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="white"
        p={8}
        rounded="lg"
        boxShadow="lg"
        minH="50vh"
        maxH="80vh"
        maxW="900px"
        w="100%"
        display="flex"           // ⭐ 카드 자체를 flex 컨테이너로
        flexDirection="column"   // 세로 방향
      >
        {/* 안쪽을 가로로 나눔 */}
        <Box
          display="flex"
          gap={6}
          flex="1"               // ⭐ 카드 높이를 꽉 채우게
        >
          {/* 1) 왼쪽: 입장한 유저 박스 (작은 박스) */}
          <Box
            w="220px"
            border="1px solid"
            borderColor="gray.200"
            rounded="md"
            p={4}
            bg="gray.50"
            display="flex"
            flexDirection="column"
            gap={3}
          >
            <Text fontSize="md" fontWeight="bold">
              참가자 ({users.length})
            </Text>

            {/* 남는 높이 다 쓰고, 넘치면 스크롤 */}
            <Box flex="1" overflowY="auto">
              {users.length === 0 ? (
                <Text fontSize="sm" color="gray.500">
                  아직 아무도 없어요 👀
                </Text>
              ) : (
                <Stack gap={2}>
                  {users.map((user) => (
                    <Box
                      key={user.userId}
                      p={2}
                      rounded="md"
                      bg="white"
                      border="1px solid"
                      borderColor="gray.200"
                    >
                      <Text fontSize="sm" fontWeight="medium">
                        {user.name}
                      </Text>
                    </Box>
                  ))}
                </Stack>
              )}
            </Box>
          </Box>

          {/* 2) 오른쪽: 메인 영역 (방 정보 + 떠나기 버튼 등) */}
          <Box flex="1">
            <Stack gap={4}>
              <Text fontSize="lg" fontWeight="bold">
                방 번호: {roomId}
              </Text>

              <Button variant="outline" size="sm" onClick={handleRoomLeave}>
                방 떠나기
              </Button>

              {/* 나중에 여기 타이머 / 문제 / 진행 상태 넣으면 됨 */}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );

};

export default GamePage;
