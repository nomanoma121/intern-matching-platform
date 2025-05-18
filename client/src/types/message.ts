import type { JSX } from "react";

export type TMessage = {
	id: string;
	sender_id: string;
	receiver_id: string;
	content: string;
	created_at: string;
	updated_at: string;
};

export type TMessageListContent = {
	map(
		arg0: (message: TMessageListContent) => JSX.Element,
	): import("react").ReactNode;
	id: string;
	latest_content: string;
	created_at: string;
	updated_at: string;
	partner: {
		id: string;
		name: string;
		display_id: string;
	};
};
