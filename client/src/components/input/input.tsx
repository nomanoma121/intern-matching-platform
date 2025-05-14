import { ComponentProps } from "react";
import { css } from "@styled-system/css";

type Props = ComponentProps<"input">;

export const Input = (props: Props) => {
  return <input {...props} className={css({
    width: "100%",
    padding: "8px",
    border: "1px solid var(--border-color)",
    borderRadius: "4px",
    fontSize: "16px",
    boxSizing: "border-box",
    "&:focus": {
      borderColor: "var(--primary-color)",
      outline: "none",
    },
    "&::placeholder": {
      color: "#ccc",
    },
  })} />;
};
