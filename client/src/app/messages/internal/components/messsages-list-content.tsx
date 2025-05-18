import { ArrowRight } from "@/components/arrow-right";
import type { TMessageListContent } from "@/types/message";
import { css } from "@styled-system/css";
import Link from "next/link";

type Props = {
	messages: TMessageListContent[];
};

export const MessagesListContent = ({ messages }: Props) => {
	return (
		<ul
			className={css({
				display: "grid",
				padding: "32px",
				borderRadius: "16px",
				maxWidth: "900px",
				margin: "0 auto",
			})}
		>
			{(messages ?? []).map((message) => (
				<li
					key={message.id}
					className={css({
						display: "flex",
						alignItems: "center",
						padding: "16px 0",
						borderBottom: "1px solid #ddd",
						width: "100%",
					})}
				>
					<div
						className={css({
							width: "200px",
							fontWeight: "bold",
							color: "#2b6cb0",
						})}
					>
						{message.partner.name}
					</div>

					<div
						className={css({
							flex: 1,
							fontSize: "15px",
							color: "#444",
							paddingRight: "16px",
						})}
					>
						{message.latest_content || "メッセージがありません。"}
					</div>

					<span
						className={css({
							fontSize: "14px",
							color: "#999",
							whiteSpace: "nowrap",
						})}
					>
						{new Date(message.created_at).toLocaleDateString()}
					</span>
					<Link
						href={`/messages/${message.partner.display_id}`}
						className={css({
							marginLeft: "16px",
							padding: "8px 16px",
							color: "#2b6cb0",
							fontWeight: "bold",
							fontSize: "16px",
							// hover時のスタイル
							_hover: {
								textDecoration: "underline",
								color: "#2b6cb0",
								backgroundColor: "#f0f4ff",
								borderRadius: "8px",
								transition: "background-color 0.3s ease",
							},
						})}
					>
						<ArrowRight />
					</Link>
				</li>
			))}
		</ul>
	);
};
