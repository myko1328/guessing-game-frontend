import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { IoIosChatboxes } from "react-icons/io";

import Title from "../Title";
import Button from "../Button";
import useSendCpuMessages from "../../hooks/useSendCpuMessages";

const Chat = ({ registeredName }: { registeredName: string }) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);
  const [chatVal, setChatVal] = useState<string>("");
  const [name] = useState<string>("Anonymous"); // Default name

  const send = (name: string, value: string) => {
    // Emit an object containing both the name and the message
    socket?.emit("message", {
      name: registeredName || name === registeredName ? "You" : name,
      message: value,
    });
  };

  useSendCpuMessages(socket, send);

  const HandleTriggerSend = () => {
    send(name, chatVal);
    setChatVal("");
  };

  useEffect(() => {
    const newSocket = io("https://guessing-game-backend-iv52.onrender.com");
    setSocket(newSocket);

    // Listen for incoming messages
    newSocket.on("message", (message: { name: string; message: string }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        `${message.name}: ${message.message}`,
      ]);
    });

    return () => {
      newSocket.off("message");
    };
  }, []);

  return (
    <div className="mt-8 flex flex-col gap-2">
      <Title
        icon={<IoIosChatboxes size={22} style={{ margin: "auto 0 auto 0" }} />}
        name="Chat"
      />
      <div className="bg-[#272b33] min-h-[209px] flex flex-col justify-between">
        <div className="max-h-[152px] p-4 overflow-y h-full overflow-auto">
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <div className="bg-[#4e5461] flex gap-4 p-2">
          <input
            value={chatVal}
            onChange={(e) => setChatVal(e.target.value)}
            className="bg-[#272b33] flex-1 rounded-md px-2"
            placeholder="Type your message here..."
          />
          <Button
            className="flex-none w-32 bg-gradient-to-r from-rose-400 to-orange-300 rounded-md p-2 font-bold"
            buttonName="Send"
            handleClick={HandleTriggerSend}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
