"use client";
import { useAuth } from "@/provider/auth";
import { useProfileList } from "./internal/hooks/use-profile-list";
import { css } from "@styled-system/css";

const Home = () => {
	const { user } = useAuth();
	if (!user) return null;
	const targetRole = user.role === "INTERN" ? "COMPANY" : "INTERN"; 
	const { profileList, loading, error } = useProfileList(targetRole);

	return (
		<div
			className={css({
				padding: "32px",
				backgroundColor: "white",
				borderRadius: "12px",
				boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
				maxWidth: "800px",
				margin: "0 auto",
			})}
		>
			<h1
				className={css({
					fontSize: "28px",
					fontWeight: "bold",
					marginBottom: "24px",
					textAlign: "center",
				})}
			>
				{user.role === "INTERN" ? "Companies" : "Interns"}
			</h1>

			{loading && <div>Loading...</div>}
			{error && <div>{error}</div>}

			<ul className={css({ display: "grid", gap: "20px" })}>
				{profileList.map((profile) => (
					<li
						key={profile.display_id}
						className={css({
							padding: "20px",
							border: "1px solid #e0e0e0",
							borderRadius: "10px",
							backgroundColor: "#f9f9f9",
							transition: "background 0.2s ease",
							_hover: {
								backgroundColor: "#f0f0f0",
							},
						})}
					>
						<a
							href={`/${user.role === "INTERN" ? "companies" : "interns"}/${profile.display_id}`}
							className={css({
								display: "block",
								fontSize: "20px",
								fontWeight: "semibold",
								color: "#2b6cb0",
								marginBottom: "8px",
								_hover: { textDecoration: "underline" },
							})}
						>
							{user.role === "INTERN" ? profile.company_name : profile.name}
						</a>
						<p
							className={css({
								fontSize: "16px",
								color: "#555",
								lineHeight: "1.5",
							})}
						>
							{profile.introduction}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
