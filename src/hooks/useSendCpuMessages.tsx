import { useEffect } from "react";

const useSendCpuMessages = (
  socket: any,
  send: (name: string, message: string) => void
) => {
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
  }, [socket]);
};

export default useSendCpuMessages;
