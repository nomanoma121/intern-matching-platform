"use client";
import { css } from "@styled-system/css";
import { useParams } from "next/navigation";
import { useIntern } from "./internal/hooks/use-intern";
import Link from "next/link";

const InternProfile = () => {
  const { display_id } = useParams<{ display_id: string }>();
  const { internData, loading, error } = useIntern(display_id);

  if (!display_id) return <div>Invalid display ID</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div
      className={css({
        minHeight: "100vh",
        backgroundColor: "#f7fafc",
        display: "flex",
        flexDirection: "column",
      })}
    >
      {/* === Hero セクション === */}
      <section
        className={css({
          background: "linear-gradient(to right, #3182ce, #63b3ed)",
          color: "white",
          padding: "80px 20px",
          textAlign: "center",
        })}
      >
        <h1
          className={css({
            fontSize: "48px",
            fontWeight: "bold",
            marginBottom: "16px",
          })}
        >
          {internData?.name}
        </h1>
        <p
          className={css({
            fontSize: "20px",
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: "1.8",
          })}
        >
          {internData?.introduction || "意欲的なインターン生です。"}
        </p>
      </section>
      <div
        className={css({
          display: "flex",
          justifyContent: "flex-end", // 右寄せ
					maxWidth: "1200px",
					width: "100%",
					margin: "0 auto",
					padding: "16px",
					marginBottom: "-110px", // TODO: 時間があれば修正
        })}
      >
        <Link
          href={`/messages/${internData?.display_id}`}
          className={css({
            textDecoration: "none",
            color: "white",
            fontSize: "16px", // 小さめに
            fontWeight: "normal", // 少し控えめ
            backgroundColor: "#4a5568", // グレー系で主張を抑える
						marginTop: "16px",
            padding: "8px 16px",
            borderRadius: "6px",
            transition: "background-color 0.2s",
            "&:hover": {
              backgroundColor: "#2d3748",
            },
          })}
        >
          メッセージを送る
        </Link>
      </div>

      {/* === 詳細情報セクション === */}
      <section
        className={css({
          padding: "60px 32px",
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "48px",
          textAlign: "left", // ← 中央ぞろえ解除
        })}
      >
        <div>
          <p
            className={css({
              fontSize: "18px",
              marginBottom: "16px",
              lineHeight: "1.8",
            })}
          >
            {internData?.description}
          </p>
          <h2
            className={css({
              fontSize: "30px",
              fontWeight: "bold",
              color: "#2a4365",
              marginBottom: "16px",
            })}
          >
            基本情報
          </h2>
          <p className={css({ fontSize: "18px", marginBottom: "8px" })}>
            <strong>ユーザーID：</strong>@{internData?.display_id}
          </p>
          <p className={css({ fontSize: "18px", marginBottom: "8px" })}>
            <strong>メールアドレス：</strong>
            {internData?.email}
          </p>
          <p className={css({ fontSize: "18px" })}>
            <strong>学年：</strong>
            {internData?.grade}
          </p>
        </div>

        <div>
          <h2
            className={css({
              fontSize: "30px",
              fontWeight: "bold",
              color: "#2a4365",
              marginBottom: "16px",
            })}
          >
            学歴・スキルなど
          </h2>
          <p className={css({ fontSize: "18px", marginBottom: "8px" })}>
            <strong>大学：</strong>
            {internData?.university}
          </p>
          <p className={css({ fontSize: "18px", marginBottom: "8px" })}>
            <strong>スキルや経歴の詳細：</strong>
          </p>
          <p
            className={css({
              backgroundColor: "#edf2f7",
              padding: "20px",
              borderRadius: "8px",
              whiteSpace: "pre-wrap",
              fontSize: "18px",
            })}
          >
            {internData?.skills || "（未入力）"}
          </p>
        </div>
      </section>

      {/* === フッター風・状態セクション === */}
      <section
        className={css({
          padding: "20px",
          backgroundColor: "#edf2f7",
          textAlign: "center",
          marginTop: "auto",
        })}
      >
        {error && (
          <p
            className={css({
              color: "red",
              fontSize: "16px",
            })}
          >
            Error: {error}
          </p>
        )}
        {!internData && !error && (
          <p
            className={css({
              fontSize: "16px",
            })}
          >
            インターン情報が見つかりません。
          </p>
        )}
      </section>
    </div>
  );
};

export default InternProfile;
