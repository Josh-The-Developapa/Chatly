import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import "./Chat.css";
import Message from "../../components/Message";

const socket = io("http://localhost:5000");

function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const location = useLocation();
  const { name } = queryString.parse(location.search);
  const { room } = queryString.parse(location.search);
  const [joined, setJoined] = useState("");

  socket.emit("joinRoom", { name, room });

  const sendChat = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      socket.emit("chat", { message, name });
    }
    setMessage("");
  };

  useEffect(() => {
    socket.on("message", (msg) => {
      setJoined(msg);
    });
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  const joindStr = <p>{joined}</p>;
  return (
    <div>
      <h1 align="center">Chatty app</h1>
      <div className="oOc">
        <div className="oC">
          <Message message={`Welcome to Chatly ${name}`} user="ChatBot" />
          <p>{}</p>
          {joindStr}
          {chat.map((payload, index) => {
            return (
              <Message
                key="index"
                message={payload.message}
                user={payload.name}
              />
            );
          })}
        </div>
        <form onSubmit={sendChat}>
          <textarea
            cols="40"
            font="elephant"
            className="ipt"
            type="text"
            name="chat"
            placeholder="send text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type="submit" className="btn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
