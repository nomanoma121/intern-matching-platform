import { useEffect, useState } from "react";
import { serverFetch } from "@/utils/fetch";
import { TMessage } from "@/types/message";

type PartnerId = string;

export const useMessage = (partnerId: PartnerId) => {
  const [messages, setMessage] = useState<TMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await serverFetch(`/messages/${partnerId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await res.json();
      setMessage(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (content: string) => {
    try {
      const res = await serverFetch(`/messages/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: { content, receiver_id: partnerId } }),
      });
      if (!res.ok) {
        throw new Error("Failed to send message");
      }
      const data = await res.json();
      setMessage((prevMessages) => [...prevMessages, data.message]);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [partnerId]);

  return { messages, loading, error, sendMessage };
};
