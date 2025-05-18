import type { TMessageListContent } from "@/types/message";
import { serverFetch } from "@/utils/fetch";
import { useEffect, useState } from "react";

export const useMessageList = () => {
	const [messages, setMessages] = useState<TMessageListContent[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | string | null>(null);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const response = await serverFetch(`/messages`);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setMessages(data);
			} catch (error) {
				if (error instanceof Error) {
					setError(error);
				} else {
					setError(String(error));
				}
			} finally {
				setLoading(false);
			}
		};

		fetchMessages();
	}, []);

	return { messages, loading, error };
};
