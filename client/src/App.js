import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatbot from "./chatbot";
import Test from "./test";
import Animal from "./animal";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<Test />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/animal" element={<Animal />} />
    </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
