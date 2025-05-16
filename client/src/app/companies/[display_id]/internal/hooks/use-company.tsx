import type { ICompany } from "@/types/company";
import { serverFetch } from "@/utils/fetch";
import { useEffect, useState } from "react";

export const useCompany = (displayId: string) => {
	const [companyData, setCompanyData] = useState<ICompany | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
    if (!displayId) return;
    
		const fetchCompanyData = async () => {
			try {
				const response = await serverFetch(`/companies/${displayId}`);
				if (!response.ok) {
					throw new Error("Failed to fetch company data");
				}
				const data: ICompany = await response.json();
				setCompanyData(data);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("An unknown error occurred");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchCompanyData();
	}, [displayId]);

	return { companyData, loading, error };
};
