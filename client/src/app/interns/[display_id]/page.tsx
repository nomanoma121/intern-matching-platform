"use client";
import { css } from "@styled-system/css";
import { useParams } from "next/navigation";
import { useIntern } from "./internal/hooks/use-intern";

const InternProfile = () => {
	const { display_id } = useParams<{ display_id: string }>();
	const { internData, loading, error } = useIntern(display_id);

	if (!display_id) {
		return <div>Invalid display ID</div>;
	}
	if (loading) return <div>Loading...</div>;

	return (
		<div
			className={css({
				padding: "20px",
				backgroundColor: "white",
				borderRadius: "8px",
				boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
			})}
		>
			<h1
				className={css({
					fontSize: "24px",
					fontWeight: "bold",
					marginBottom: "16px",
				})}
			>
				{internData?.name}
			</h1>
			<p
				className={css({
					fontSize: "16px",
					marginBottom: "8px",
				})}
			>
				Display ID: {internData?.display_id}
			</p>
			<p
				className={css({
					fontSize: "16px",
					marginBottom: "8px",
				})}
			>
				Email: {internData?.email}
			</p>
			<p
				className={css({
					fontSize: "16px",
					marginBottom: "8px",
				})}
			>
				University: {internData?.university}
			</p>
			<p
				className={css({
					fontSize: "16px",
					marginBottom: "8px",
				})}
			>
				Skills: {internData?.skills}
			</p>
			<p
				className={css({
					fontSize: "16px",
					marginBottom: "8px",
				})}
			>
				Grade: {internData?.grade}
			</p>
			{error && (
				<p
					className={css({
						color: "red",
						fontSize: "16px",
						marginTop: "16px",
					})}
				>
					Error: {error}
				</p>
			)}
			{!internData && !error && (
				<p
					className={css({
						fontSize: "16px",
						marginTop: "16px",
					})}
				>
					No intern data available.
				</p>
			)}
		</div>
	);
};

export default InternProfile;
