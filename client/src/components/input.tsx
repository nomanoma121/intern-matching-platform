import { css, cx } from "@styled-system/css";
import type { ComponentProps } from "react";

type Props = ComponentProps<"input">;

export const Input = (props: Props) => {
	const { className, ...rest } = props;
	return (
		<input
			{...rest}
			className={cx(
				css({
					width: "100%",
					padding: "10px 12px",
					border: "2px solid #bbb", // 濃いグレーでしっかり見えるボーダー
					borderRadius: "6px", // 少し丸め
					fontSize: "16px",
					backgroundColor: "#fff", // 白背景固定
					boxSizing: "border-box",
					transition: "border-color 0.2s ease",
					"&:focus": {
						borderColor: "#3b82f6", // 青系で強調（Tailwindのblue-500相当）
						outline: "none",
						boxShadow: "0 0 4px #3b82f6aa",
					},
					"&::placeholder": {
						color: "#999",
						fontWeight: "400",
					},
				}),
				className,
			)}
		/>
	);
};
