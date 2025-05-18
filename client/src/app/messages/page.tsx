"use client";
import { Container } from "@/components/container";
import { useAuth } from "@/provider/auth";
import { MessagesListContent } from "./internal/components/messsages-list-content";
import { useMessageList } from "./internal/hooks/use-message-list";

const MessagesList = () => {
	const { user } = useAuth();
	if (!user) return null;
	const { messages, loading, error } = useMessageList();
	return (
		<Container>
			<h1
				style={{
					fontSize: "32px",
					fontWeight: "bold",
					textAlign: "center",
					marginTop: "32px",
					marginBottom: "32px",
					color: "#2b6cb0",
				}}
			>
				メッセージ一覧
			</h1>
			<MessagesListContent messages={messages} />
		</Container>
	);
};

export default MessagesList;
