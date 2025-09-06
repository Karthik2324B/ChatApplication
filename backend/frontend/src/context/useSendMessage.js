import { useState } from "react";
import axios from "axios";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { setMessage,messages, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message },
       
      );

      setMessage([...messages,res.data]);

    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
