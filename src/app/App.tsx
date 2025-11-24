import LoginPage from "../pages/LogInPage";
import SignupPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";
import TestPage from "../pages/TestPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import RootRoute from "./routes/RootRoute";
import { useAuthBootstrap } from "@/features/auth/api/authBootstrap";
import { Center, Spinner } from "@chakra-ui/react";

function App() {
  const { isLoading } = useAuthBootstrap();

  if (isLoading) {
    // 🔥 auth/me 체크 끝나기 전까지는 아무 라우트도 안 씀
    return (
      <Center w="100vw" h="100vh">
        <Spinner />
      </Center>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRoute />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;