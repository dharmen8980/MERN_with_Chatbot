import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiChatbot } from "react-icons/si";
import { ImCancelCircle } from "react-icons/im";
import Chatbot from "./chatbot";
import Test from "./test";

function App() {
  const [showChat, setShowChat] = useState(false);
  return (
    <div className="App">
      <SiChatbot
        className={
          !showChat
            ? "text-green-600 text-4xl fixed bottom-4 right-6 cursor-pointer"
            : "hidden"
        }
        onClick={() => setShowChat(true)}
      />
      <div
        className={showChat ? "w-[25rem] absolute right-2 bottom-0" : "hidden"}
      >
        <p className="flex justify-end mr-2 relative text-white">
          <ImCancelCircle
            className="text-2xl absolute top-5 z-50 cursor-pointer"
            onClick={() => setShowChat(false)}
          />
        </p>
        <Chatbot />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Test />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
