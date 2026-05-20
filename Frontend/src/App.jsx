import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChatPage from "./pages/ChatPage";

function App(){
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={ token ? <Navigate to="/" /> : <Login setToken={setToken} /> } />
        <Route path="/signup" element={ token ? <Navigate to="/" /> : <Signup /> } />
        <Route path="/" element={ token ? <ChatPage /> : <Navigate to="/login" /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
