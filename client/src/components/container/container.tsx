import { css } from "@styled-system/css";

interface Props {
  children: React.ReactNode;
}

export const Container = ({ children }: Props) => {
  return <div className={css({
    width: "100%",
    maxWidth: "800px",
    padding: "0 16px",
    margin: "0 auto",
    boxSizing: "border-box",
  })}>{children}</div>;
};
