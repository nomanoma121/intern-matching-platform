"use client";
import { Container } from "@/components/container";
import { useAuth } from "@/provider/auth";
import { css } from "@styled-system/css";
import { useProfileList } from "./internal/hooks/use-profile-list";

const Home = () => {
	const { user } = useAuth();
	if (!user) return null;

	const targetRole = user.role === "INTERN" ? "COMPANY" : "INTERN";
	const { profileList, loading, error } = useProfileList(targetRole);

	return (
		<div
			className={css({
				padding: "32px",
				borderRadius: "16px",
				maxWidth: "900px",
				margin: "0 auto",
			})}
		>
			<Container>
				<h1
					className={css({
						fontSize: "32px",
						fontWeight: "bold",
						textAlign: "center",
						marginBottom: "32px",
						color: "#2b6cb0",
					})}
				>
					こんにちは、{user.display_id} さん
				</h1>
				<h1
					className={css({
						fontSize: "32px",
						fontWeight: "bold",
						textAlign: "center",
						marginBottom: "32px",
						color: "#2b6cb0",
					})}
				>
					{user.role === "INTERN"
						? "💼 登録企業一覧"
						: "🎓 学生プロフィール一覧"}
				</h1>

				{loading && <div>Loading...</div>}
				{error && <div>{error}</div>}

				<ul
					className={css({
						display: "grid",
					})}
				>
					{profileList.map((profile) => (
						<li
							key={profile.display_id}
							className={css({
								display: "flex",
								alignItems: "center",
								padding: "16px 0",
								borderBottom: "1px solid #ddd", // 下線だけ
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
								{user.role === "INTERN" ? profile.company_name : profile.name}
							</div>

							<div
								className={css({
									flex: 1,
									fontSize: "15px",
									color: "#444",
									paddingRight: "16px",
								})}
							>
								{profile.introduction || "自己紹介がまだありません。"}
							</div>

							{/* 詳細リンク（右端） */}
							<a
								href={`/${user.role === "INTERN" ? "companies" : "interns"}/${
									profile.display_id
								}`}
								className={css({
									color: "#3182ce",
									fontWeight: "medium",
									textDecoration: "none",
									_hover: { textDecoration: "underline" },
								})}
							>
								詳細 ➜
							</a>
						</li>
					))}
				</ul>
			</Container>
		</div>
	);
};

export default Home;
