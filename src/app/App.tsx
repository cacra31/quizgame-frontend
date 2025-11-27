import LoginPage from "../pages/LogInPage";
import SignupPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";
import TestPage from "../pages/TestPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import RootRoute from "./routes/RootRoute";
import { useAuthBootstrap } from "@/features/auth/api/authBootstrap";
import ProtectedRoute from "./routes/ProtectedRoute";
import { WebSocketProvider } from "@/shared/websocket/WebSocketProvider";
import GamePage from "../pages/GamePage";

function App() {
  const { isLoading } = useAuthBootstrap();

  if (isLoading) {
    return null;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRoute />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={
          <WebSocketProvider >
            <ProtectedRoute />
          </WebSocketProvider>
        }>
          <Route path="/home" element={<HomePage />} />
          <Route path="/game/:gameId" element={<GamePage />} />
          <Route path="/test" element={<TestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;