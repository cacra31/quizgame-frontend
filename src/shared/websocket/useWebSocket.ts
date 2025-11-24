import { useWebSocketContext } from "./WebSocketProvider";

export const useWebSocket = () => {
  const { client, connected, send, subscribe } = useWebSocketContext();
  return { client, connected, send, subscribe };
};
