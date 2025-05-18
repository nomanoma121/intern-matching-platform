import { Container } from "@/components/container";
import { css } from "@styled-system/css";
import Image from "next/image";
import Link from "next/link";

const Top = () => {
  return (
    <div
      className={css({
        minHeight: "100vh",
        backgroundColor: "#f7fafc",
      })}
    >
      <div className={css({
				position: "relative",
				width: "100%",
				height: "450px",
			})}>
        <Image
          src="/images/hero.png"
          alt="Team working together"
					fill
          className={css({
            objectFit: "cover",
            maxHeight: "400px",
						margin: "0 auto",
          })}
        />
      </div>
      <Container>
        <h1
          className={css({
            fontSize: "40px",
            fontWeight: "bold",
            marginBottom: "16px",
            color: "#2b6cb0",
          })}
        >
          Intern Matching Platform
        </h1>

        <p
          className={css({
            fontSize: "20px",
            color: "gray.700",
            marginBottom: "32px",
            lineHeight: "1.6",
          })}
        >
          あなたの才能を企業とつなぐ、インターンシップマッチングサービス。
          <br />
          学生と企業のベストマッチを、スマートに。
        </p>

        <div>
          <Link
            href="/login"
            className={css({
              display: "inline-block",
              padding: "16px 32px",
              backgroundColor: "#2b6cb0",
              color: "#fff",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "18px",
              fontWeight: "bold",
              marginRight: "16px",
            })}
          >
            ログイン
          </Link>
          <Link
            href="/register"
            className={css({
              display: "inline-block",
              padding: "16px 32px",
              backgroundColor: "gray.700",
              color: "#fff",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "18px",
              fontWeight: "bold",
            })}
          >
            新規登録
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Top;
