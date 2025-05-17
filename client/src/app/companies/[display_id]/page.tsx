"use client";
import { css } from "@styled-system/css";
import { useParams } from "next/navigation";
import { useCompany } from "./internal/hooks/use-company";

const companyProfile = () => {
	const { display_id } = useParams<{ display_id: string }>();
	const { companyData, loading, error } = useCompany(display_id);

	if (!display_id) {
		return <div>loading</div>;
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
				{companyData?.company_name}
			</h1>
			<p
				className={css({
					fontSize: "16px",
					marginBottom: "8px",
				})}
			>
				Display ID: {companyData?.display_id}
			</p>
			<p
				className={css({
					fontSize: "16px",
					marginBottom: "8px",
				})}
			>
				Email: {companyData?.email}
			</p>
			<p
				className={css({
					fontSize: "16px",
					marginBottom: "8px",
				})}
			>
				Description: {companyData?.description}
			</p>
			<p
				className={css({
					fontSize: "16px",
					marginBottom: "8px",
				})}
			>
				Location: {companyData?.location}
			</p>
			<p
				className={css({
					fontSize: "16px",
					marginBottom: "8px",
				})}
			>
				Introduction: {companyData?.introduction}
			</p>
		</div>
	);
};

export default companyProfile;
