import { useLogoutMutation } from '@/features/auth/api/authMutation';
import { useRoomEnterMutation, useRoomListQuery } from '@/features/room/api/roomApi';
import { useWebSocket } from '@/shared/websocket/useWebSocket';
import { Box, Button, Grid, Heading, Stack, Spinner, Text, Badge, Flex, } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation();
  const { data, isLoading, isError, refetch } = useRoomListQuery();
  const { connected, subscribe } = useWebSocket();
  const roomEnterMutation = useRoomEnterMutation();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => navigate('/login', { replace: true }),
      onError: () => navigate('/login', { replace: true }),
    });
  };

  const handleEnterRoom = (categoryId: number) => {
    roomEnterMutation.mutate(categoryId, {
      onSuccess: (res:any) => {
        navigate(`/game/${res.data.roomId}`, { replace: true });
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  // 방 상태 웹소켓 구독 → 메시지 오면 방 목록 refetch
  useEffect(() => {
    const sub = subscribe('/topic/room-list', () => {
      refetch();
    });
    return () => {
      sub?.unsubscribe();
    };
  }, [subscribe, refetch]);

  // 로딩 처리
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
          <Text>방 목록을 불러오지 못했습니다.</Text>
          <Button onClick={() => refetch()}>다시 시도</Button>
        </Stack>
      </Box>
    );
  }

  const roomList = data ?? [];

  return (
    <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
      <Box bg="white" p={8} rounded="lg" boxShadow="lg" maxW="900px" w="100%">
        <Stack gap={6}>
          {/* 헤더 + 로그아웃 + 웹소켓 상태 */}
          <Flex justify="space-between" align="center">
            <Box>
              <Heading size="lg">퀴즈 게임</Heading>
              <Text fontSize="sm" color="gray.500">
                카테고리를 확인하고 입장하세요.
              </Text>
            </Box>

            <Stack direction="row" align="center" gap={3}>
              <Badge
                variant="subtle"
                bgColor={connected ? 'green.100' : 'red.100'}
              >
                {connected ? '실시간 연결 중' : '연결 안 됨'}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                로그아웃
              </Button>
            </Stack>
          </Flex>

          {/* 방 리스트 영역 */}
          <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
            {roomList.map((room) => {
              const hasWaitingRoom = !!room.roomId;

              return (
                <Box
                  key={room.categoryName}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  bg="gray.50"
                >
                  <Stack gap={2}>
                    <Flex justify="space-between" align="center">
                      <Text fontWeight="bold">{room.categoryName}</Text>
                    </Flex>
                    {hasWaitingRoom ? (
                      <>
                        <Text fontSize="sm" color="gray.600">
                          인원: {room.currentPlayer ?? 0} / {room.maxPlayer ?? 2}
                        </Text>
                        {room.createdAt && (
                          <Text fontSize="xs" color="gray.500">
                            대기 시간: {room.createdAt}
                          </Text>
                        )}
                        <Button
                          size="sm"
                          mt={2}
                          colorScheme="blue"
                          onClick={() => {
                            handleEnterRoom(room.categoryId);
                          }}
                        >
                          입장하기
                        </Button>
                      </>
                    ) : (
                      <>
                        <Text fontSize="sm" color="gray.600">
                          현재 대기 중인 방이 없습니다.
                        </Text>
                        <Button
                          size="sm"
                          mt={2}
                          variant="outline"
                          onClick={() => {
                            handleEnterRoom(room.categoryId);
                          }}
                        >
                          방 만들기
                        </Button>
                      </>
                    )}
                  </Stack>
                </Box>
              );
            })}
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
};

export default HomePage;
