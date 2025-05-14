import Link from "next/link";
import { css } from "@styled-system/css";
import { useAuth } from "../../provider/auth";
import { Button } from "../button";

export const Header = () => {
  const auth = useAuth();

  const headerNavItemStyles = css({
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
    textDecoration: "none",
    padding: "8px",
    borderRadius: "8px",
    "&:hover": {
      color: "var(--primary-color)",
    },
  });

  const headerNavItemButtonStyles = css({
    backgroundColor: "var(--primary-color)",
    border: "none",
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
  });

  return (
    <header
      className={css({
        padding: "16px",
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #e0e0e0",
      })}
    >
      <div className={css({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1200px",
        width: "100%",
        margin: "0 auto",
      })}>
        <Link href="/">
          <img src="/logo.svg" alt="You Do Logo" height="30" />
        </Link>

        <nav>
          <ul className={css({
            display: "flex",
            alignItems: "center",
            listStyle: "none",
            padding: 0,
            gap: "24px",
            margin: 0,
          })}>
            <li>
              <Link href="/" className={headerNavItemStyles}>
                Home
              </Link>
            </li>
            {auth.user && (
              <li>
                <Link href="/todos" className={headerNavItemStyles}>
                  Todos
                </Link>
              </li>
            )}
            {auth.user ? (
              <li>
                <Button
                  onClick={() => {
                    auth.logout();
                  }}
                  className={headerNavItemButtonStyles}
                >
                  Logout
                </Button>
              </li>
            ) : (
              <li>
                <Link href="/login" className={headerNavItemButtonStyles}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
