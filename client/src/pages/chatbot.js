import React, { useRef } from "react";
import { useState, useEffect } from "react";

const Chatbot = () => {
  const initialMessages = [
    {
      user: "",
      bot: "Hello, How can I help you?",
    },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [userMessage, setUserMessage] = useState("");

  //send message to server and retrieve response
  async function handleSubmit(event) {
    event.preventDefault();
    setMessages([...messages, { user: userMessage, bot: "..." }]);

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
      // general error handling
      console.error(error);
      alert(error.message);
    }
  }

  const messageListRef = useRef(null);

  useEffect(() => {
    messageListRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="text-center overflow-auto relative">

        <h1 className="text-2xl font-bold text-white bg-slate-500 rounded-lg relative top-3 z-40">
          Chatbot
        </h1>

      <section className="h-[30rem] flex flex-col bg-slate-500 shadow-xl relative rounded-lg  overflow-auto py-[2rem]">
        {messages.map((message, index) => (
          <div key={index} ref={messageListRef}>
            {message.user && (
              <div className=" text-right text-white flex justify-end mb-[2rem]">
                <div className="max-w-[40rem] px-4 py-2 rounded-lg shadow-lg bg-slate-900">
                  {message.user}
                </div>
              </div>
            )}
            {message.bot && (
              <div className="text-left w-fit text-white mb-[2rem]">
                <div className="max-w-[40rem] px-4 py-2 rounded-lg shadow-lg bg-slate-600">
                  {message.bot}
                </div>
              </div>
            )}
          </div>
        ))}
      </section>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="textarea"
          className="w-[20rem] overflow-y  border border-slate-700 rounded-md p-2 absolute bottom-0 left-0"
          placeholder="Type your message here"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <input
          type="submit"
          className="h-10 absolute bottom-[1px] right-0  px-4 cursor-pointer shadow-lg bg-blue-200"
        />
      </form>
    </div>
  );
};

export default Chatbot;
