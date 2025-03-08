import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ROUTES IMPORT's
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Group = lazy(() => import("./pages/Group"));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:chatId" element={<Chat />} />
        <Route path="/group" element={<Group />} />
        <Route path="/login" element={<Login />} />
        <Route />
      </Routes>
    </Router>
  );
};

export default App;
