import { css, cx } from "@styled-system/css";
import type { ComponentProps } from "react";

type Props = ComponentProps<"button">;

export const Button = ({ className, ...props }: Props) => {
	const baseStyle = css({
		backgroundColor: "#4F46E5", // Indigo-600
		color: "#FFFFFF",
		paddingY: "10px",
		paddingX: "20px",
		fontSize: "16px",
		fontWeight: "500",
		border: "none",
		borderRadius: "12px",
		cursor: "pointer",
		transition: "all 0.2s ease-in-out",
		boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
		"&:hover": {
			backgroundColor: "#4338CA", // Indigo-700
			boxShadow: "0 6px 10px rgba(0, 0, 0, 0.12)",
			transform: "translateY(-2px)",
		},
		"&:active": {
			transform: "translateY(0)",
			boxShadow: "0 3px 6px rgba(0, 0, 0, 0.08)",
		},
		"&:focus": {
			outline: "2px solid #C7D2FE", // focus ring
			outlineOffset: "2px",
		},
	});

	return <button {...props} className={cx(baseStyle, className)} />;
};
