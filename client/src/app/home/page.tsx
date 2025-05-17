"use client";
import { useAuth } from "@/provider/auth";
import { useProfileList } from "./internal/hooks/use-profile-list";
import { css } from "@styled-system/css";
import { Container } from "@/components/container";

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
				{user.role === "INTERN" ? "💼 掲載企業一覧" : "🎓 学生プロフィール一覧"}
			</h1>

			{loading && <div>Loading...</div>}
			{error && <div>{error}</div>}

			<ul
				className={css({
					display: "grid",
					gridTemplateColumns: ["1fr", "1fr 1fr"],
					gap: "24px",
				})}
			>
				{profileList.map((profile) => (
					<li
						key={profile.display_id}
						className={css({
							display: "flex",
							flexDirection: "column",
							padding: "20px",
							border: "1px solid #e0e0e0",
							borderRadius: "12px",
							backgroundColor: "#fafafa",
							boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
							transition: "transform 0.2s ease",
							_hover: {
								transform: "translateY(-4px)",
								backgroundColor: "#f5f5f5",
							},
						})}
					>
						<div className={css({ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" })}>
							<div>
								<h2
									className={css({
										fontSize: "20px",
										fontWeight: "semibold",
										color: "#2b6cb0",
									})}
								>
									{user.role === "INTERN" ? profile.company_name : profile.name}
								</h2>
							</div>
						</div>
						<p
							className={css({
								fontSize: "15px",
								color: "#444",
								lineHeight: "1.6",
								flex: 1,
								marginBottom: "16px",
							})}
						>
							{profile.introduction || "自己紹介がまだありません。"}
						</p>
						<a
							href={`/${user.role === "INTERN" ? "companies" : "interns"}/${profile.display_id}`}
							className={css({
								alignSelf: "flex-end",
								backgroundColor: "#3182ce",
								color: "white",
								padding: "8px 16px",
								borderRadius: "6px",
								fontWeight: "medium",
								textDecoration: "none",
								_hover: { backgroundColor: "#2b6cb0" },
							})}
						>
							詳細を見る →
						</a>
					</li>
				))}
			</ul>
			</Container>
		</div>
	);
};

export default Home;
