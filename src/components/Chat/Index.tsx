import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { IoIosChatboxes } from "react-icons/io";

import Title from "../Title";

const Chat = ({ registeredName }: { registeredName: string }) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);
  const [chatVal, setChatVal] = useState<string>("");
  const [name, setName] = useState<string>("Anonymous"); // Default name

  const send = (name: string, value: string) => {
    // Emit an object containing both the name and the message
    socket?.emit("message", {
      name: registeredName || name === registeredName ? "You" : name,
      message: value,
    });
  };

  useEffect(() => {
    const newSocket = io("https://guessing-game-backend-iv52.onrender.com");
    setSocket(newSocket);

    // Listen for incoming messages
    newSocket.on("message", (message: { name: string; message: string }) => {
      // Update the messages state to include the new message
      // This assumes the server sends back an object with name and message
      setMessages((prevMessages) => [
        ...prevMessages,
        `${message.name}: ${message.message}`,
      ]);
    });

    return () => {
      newSocket.off("message");
    };
  }, []);

  // Inside your component
  useEffect(() => {
    const cpuNames = ["CPU 1", "CPU 2", "CPU 3"];
    const cpuMessages = [
      "Hello, I'm CPU 1!",
      "CPU 2 here, how's it going?",
      "Hey! CPU 3 in the house!",
    ];

    // Send each CPU message once after a delay
    cpuNames.forEach((name, index) => {
      setTimeout(() => send(name, cpuMessages[index]), 5000 + index * 2000);
    });

    // Note: No cleanup function is needed for setTimeout when used like this
  }, [socket]); // Dependency array

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
          <button
            onClick={() => {
              send(name, chatVal);
              setChatVal("");
            }}
            className="flex-none w-32 bg-gradient-to-r from-rose-400 to-orange-300 rounded-md p-2 font-bold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
