import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const Chat = () => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);
  const [messageVal, setMessageVal] = useState<string>("");

  const send = (value: string) => {
    socket?.emit("message", value);
  };

  useEffect(() => {
    const newSocket = io(
      "https://guessing-game-backend-iv52.onrender.com:8001"
    );
    console.log({ newSocket });
    setSocket(newSocket);
  }, [setSocket]);

  const messageListener = (message: string) => {
    setMessages([...messages, message]);
  };

  useEffect(() => {
    socket?.on("message", messageListener);

    return () => {
      socket?.off("message", messageListener);
    };
  }, [messageListener]);

  return (
    <div className="mt-8 flex flex-col gap-2">
      <h3 className="text-lg font-bold">Chat</h3>
      <div className="bg-[#272b33] min-h-[209px] flex flex-col justify-between">
        <div className="max-h-[152px] p-4 overflow-y h-full overflow-auto">
          {messages.map((message, index) => (
            <div key={index}>YOU: {message}</div>
          ))}
        </div>
        <div className="bg-[#4e5461] flex gap-4 p-2">
          <input
            onChange={(e) => setMessageVal(e.target.value)}
            className="bg-[#272b33] flex-1 rounded-md px-2"
          />
          <button
            onClick={() => send(messageVal)}
            className="flex-none w-32 bg-gradient-to-r from-rose-400 to-orange-300 rounded-md p-2 font-bold"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
