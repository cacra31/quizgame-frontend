// src/websocket/WebSocketProvider.tsx
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { CompatClient, Stomp} from "@stomp/stompjs";
import type { StompSubscription } from "@stomp/stompjs";

type WebSocketContextValue = {
  client: CompatClient | null;
  connected: boolean;
  send: (destination: string, body?: any, headers?: Record<string, string>) => void;
  subscribe: (
    destination: string,
    callback: (message: any) => void
  ) => StompSubscription | null;
};

const WebSocketContext = createContext<WebSocketContextValue | null>(null);

// 필요하면 .env 로 빼도 됨
const WS_URL = "http://localhost:8080/ws";

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState<CompatClient | null>(null);
  const [connected, setConnected] = useState(false);
  const hasConnectedRef = useRef(false);

  useEffect(() => {
    if (hasConnectedRef.current) return;
    hasConnectedRef.current = true;

    const socket = new SockJS(WS_URL);
    const stomp = Stomp.over(socket);

    stomp.connect(
      {},
      () => {
        setClient(stomp);
        setConnected(true);
      },
      () => {
        setConnected(false);
      }
    );

    return () => {
      if (stomp.connected) {
        stomp.disconnect(() => {
        });
      }
    };
  }, []);

  const send = (
    destination: string,
    body?: any,
    headers: Record<string, string> = {}
  ) => {
    if (!client || !connected) {
      return;
    }

    const payload = body ? JSON.stringify(body) : "{}";
    client.send(destination, headers, payload);
  };

  const subscribe = (
    destination: string,
    callback: (message: any) => void
  ): StompSubscription | null => {
    if (!client || !connected) {
      return null;
    }

    const sub = client.subscribe(destination, (frame) => {
      try {
        const parsed = JSON.parse(frame.body);
        callback(parsed);
      } catch {
        callback(frame.body);
      }
    });

    return sub;
  };

  const value: WebSocketContextValue = {
    client,
    connected,
    send,
    subscribe,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => {
  const ctx = useContext(WebSocketContext);
  if (!ctx) {
    throw new Error("useWebSocketContext must be used within WebSocketProvider");
  }
  return ctx;
};
