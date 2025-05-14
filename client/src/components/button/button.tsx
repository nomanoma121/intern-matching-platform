import { ComponentProps } from "react";
import { css } from "@styled-system/css"; 

type Props = ComponentProps<"button">;

export const Button = (props: Props) => {
  return <button {...props} className={css({
    backgroundColor: "var(--primary-color)",
    color: "white",
    padding: "8px 16px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "var(--secondary-color)",
    },
  })} />;
};
