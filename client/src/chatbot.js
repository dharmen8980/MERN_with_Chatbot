import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

const Chatbot = () => {
  const initialMessages = [
    {
      user: "",
      bot: "Hello, How can I help you?",
    },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [userMessage, setUserMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setMessages([...messages, { user: userMessage, bot: "" }]);

    try {
      const response = await fetch("http://localhost:4000/api/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userMessage }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setMessages([...messages, { user: userMessage, bot: data.result }]);
      setUserMessage("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="max-w-[728px] mx-auto text-center">
      <section className="flex flex-col h-[90vh] bg-slate-500 mt-10  shadow-xl border relative rounded-lg ">
        <div>
          <h1 className="text-2xl font-bold text-white">Chatbot</h1>
        </div>
        {messages.map((message, index) => (
          <div key={index} className="">
            {/* {message.bot && ( */}
            <div className=" text-right text-white p-2 rounded-md flex justify-end">
              {message.user}
            </div>
            {/* )} */}
            {/* {message.user && ( */}
            <div className="text-left w-fit text-white p-2 rounded-md">
              <div className="w-fit">{message.bot}</div>
            </div>
            {/* )} */}
          </div>
        ))}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full h-10 border border-slate-700 rounded-md p-2 absolute bottom-0 left-0"
            placeholder="Type your message here"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <input
            type="submit"
            className="h-10 absolute bottom-0 right-4 cursor-pointer"
          />
        </form>
      </section>
    </div>
  );
};

export default Chatbot;
