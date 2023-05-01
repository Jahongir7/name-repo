/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: inputValue },
    ]);

    sendMessage(inputValue);

    setInputValue("");
  };

  const sendMessage = (message) => {
    const url = "https://api.openai.com/v1/chat/completions";
    const API_KEY = "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";
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    };
    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    };
    setIsLoading(true);

    axios
      .post(url, data, { headers: headers })
      .then((res) => {
        console.log(res);
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { type: "bot", message: res.data.choices[0].message.content },
        ]);
        setIsLoading(false);
        console.log(chatLog);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <>
      <h1>ChatGPT</h1>
      {chatLog?.map((message, index) => {
        return <div key={index}> {message.message} </div>;
      })}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button>Send</button>
      </form>
    </>
  );
}

export default App;
