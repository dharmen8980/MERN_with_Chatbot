import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiChatbot } from "react-icons/si";
import { ImCancelCircle } from "react-icons/im";
import Chatbot from "./pages/chatbot";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import Product from "./pages/products";
import Cart from "./pages/cart";
import Test from "./pages/test";

function App() {
  const [showChat, setShowChat] = useState(false);
  return (
    <div className="App">
      <SiChatbot
        className={
          !showChat
            ? "text-green-600 text-4xl fixed bottom-4 right-6 cursor-pointer z-40"
            : "hidden"
        }
        onClick={() => setShowChat(true)}
      />
      <div
        className={showChat ? "w-[25rem] fixed right-2 bottom-0 z-40" : "hidden"}
      >
        <p className="flex justify-end mr-2 relative text-white">
          <ImCancelCircle
            className="text-2xl absolute top-5 z-50 cursor-pointer"
            onClick={() => setShowChat(false)}
          />
        </p>
        <Chatbot  />
      </div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact  path="/chatbot" element={<Chatbot />} />
          <Route exact path="/products" element={<Product/>} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/test" element={<Test/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default React.memo(App);
