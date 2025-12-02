import { useSubmitAnswerMutation } from "@/features/answer/api/answerApi";
import { useRoomLeaveMutation, useRoomQuery } from "@/features/room/api/roomApi";
import { useWebSocket } from "@/shared/websocket/useWebSocket";
import type { GameEvent } from "@/types/gameType";
import type { UserDto } from "@/types/userType";
import { Box, Button, Center, Input, Progress, ProgressCircle, RadioGroup, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const GamePage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { subscribe } = useWebSocket();
  const roomLeaveMutation = useRoomLeaveMutation();
  const submitAnswerMutation = useSubmitAnswerMutation();
  const { data, isLoading, isError, refetch } = useRoomQuery(Number(roomId));
  const [users, setUsers] = useState<UserDto[]>([]);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [gameEvent, setGameEvent] = useState<GameEvent>({ type: 'WAITING', roomId: null, index: null, question: null });
  const [answer, setAnswer] = useState('');

  const progress = remaining === null ? 0 : ((60 - remaining) / 60) * 100;

  const handleRoomLeave = () => {
    roomLeaveMutation.mutate(
      undefined, {
      onSuccess: () => {
        navigate('/home', { replace: true });
      },
    });
  }

  const handleSubmit = () => {
    console.log(answer);
    submitAnswerMutation.mutate({
      roomId: Number(roomId),
      index: gameEvent.index,
      answer: answer
    }, {
      onSuccess: (res) => {
        console.log(res);
      },
    });
  }

  useEffect(() => {
    if (data?.users) {
      setUsers(data.users);
    }
  }, [data?.users]);

  useEffect(() => {
    if (!data?.createdAt) return;

    const created = new Date(data.createdAt).getTime();
    const endTime = created + 60 * 1000; // 생성시간 + 60초

    const timer = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((endTime - now) / 1000));
      setRemaining(diff);
    }, 1000);

    return () => clearInterval(timer);
  }, [data?.createdAt]);

  useEffect(() => {
    const subs = [
      subscribe(`/topic/room/${roomId}/users`, (users) => setUsers(users)),
      subscribe(`/topic/room/${roomId}/event`, (gameEvent: GameEvent) => {
        if (gameEvent.type === 'RESULT') {

        } else {
          setAnswer('');
          setGameEvent(gameEvent);
        }
      }),
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
            <Stack h="100%" display="flex">
              <Text fontSize="lg" fontWeight="bold">{data?.categoryName}</Text>
              {gameEvent?.type === 'WAITING' && (
                <Stack flex="1" justify="space-between">
                  <Button variant="outline" size="sm" onClick={handleRoomLeave}>
                    방 떠나기
                  </Button>
                  <Center>
                    <Text color="blue.500" fontWeight="bold">
                      남은 대기시간: {remaining !== null ? `${remaining}초` : '...'}
                    </Text>
                  </Center>
                  <Progress.Root value={progress} size="sm" borderRadius="md">
                    <Progress.Track bg="gray.200">
                      <Progress.Range
                        bg="blue.400"
                        transition="width 0.3s linear"
                      />
                    </Progress.Track>
                  </Progress.Root>
                </Stack>
              )}
              {gameEvent?.type === 'GAME_STARTED' && (
                <Stack flex="1">
                  <Center>
                    <Text>잠시후 게임이 시작됩니다.</Text>
                  </Center>
                  <ProgressCircle.Root value={null} size="sm">
                    <ProgressCircle.Circle>
                      <ProgressCircle.Track />
                      <ProgressCircle.Range />
                    </ProgressCircle.Circle>
                  </ProgressCircle.Root>
                </Stack>
              )}
              {gameEvent?.type === 'QUESTION_STARTED' && (
                <Stack flex="1">
                  <Text color="blue.500">{gameEvent.question?.content}</Text>

                  {gameEvent.question?.questionType === 1 ? (
                    <Input
                      placeholder="정답을 입력하세요"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                  ) :
                    <RadioGroup.Root                    >
                      <VStack align="stretch" gap={2}>
                        {gameEvent.question?.answers.map((answer, idx) => (
                          <RadioGroup.Item
                            key={idx}
                            value={answer.answer}
                            cursor="pointer"
                            p={2}
                            borderRadius="md"
                            borderWidth="1px"
                            onClick={() => { console.log(answer.answer); setAnswer(answer.answer) }}
                          >
                            <RadioGroup.ItemHiddenInput />
                            <RadioGroup.ItemIndicator />
                            <RadioGroup.ItemText>{answer.answer}</RadioGroup.ItemText>
                          </RadioGroup.Item>
                        ))}
                      </VStack>
                    </RadioGroup.Root>
                  }
                  <Button onClick={handleSubmit}>정답 제출</Button>
                </Stack>
              )}
              {gameEvent?.type === 'QUESTION_FINISHED' && (
                <Stack flex="1">
                  <Center>
                    <Text>다음 문제 출제중...</Text>
                  </Center>
                  <ProgressCircle.Root value={null} size="sm">
                    <ProgressCircle.Circle>
                      <ProgressCircle.Track />
                      <ProgressCircle.Range />
                    </ProgressCircle.Circle>
                  </ProgressCircle.Root>
                </Stack>
              )}
              {gameEvent?.type === 'GAME_FINISHED' && (
                <Stack flex="1">
                  <Center>
                    <Text color="blue.500">퀴즈가 종료되었습니다.</Text>
                  </Center>
                </Stack>
              )}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );

};

export default GamePage;
