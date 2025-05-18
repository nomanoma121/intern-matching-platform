import type { TMessage } from "@/types/message";
import { serverFetch } from "@/utils/fetch";
import { useEffect, useState } from "react";

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
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unknown error occurred");
			}
		} finally {
			setLoading(false);
		}
	};

	const sendMessage = async (content: string) => {
		try {
			const res = await serverFetch(`/messages`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message: { content, receiver_id: partnerId } }),
			});
			if (!res.ok) {
				throw new Error("Failed to send message");
			}
			fetchMessages();
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unknown error occurred");
			}
		}
	};

	useEffect(() => {
		fetchMessages();
	}, [partnerId]);

	return { messages, loading, error, sendMessage };
};
