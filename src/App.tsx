import LoginPage from "./pages/LogInPage";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import { WebSocketProvider } from "./websocket/WebSocketProvider";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <WebSocketProvider>
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/test" element={<TestPage />} />
            </Routes>
          </WebSocketProvider>
        }
      />
    </Routes>
  );
}

export default App;