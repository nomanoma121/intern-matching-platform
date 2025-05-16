import type { TIntern } from "@/types/intern";
import { serverFetch } from "@/utils/fetch";
import { useEffect, useState } from "react";

export const useIntern = (displayId: string) => {
	const [internData, setInternData] = useState<TIntern | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
    if (!displayId) return;
    
		const fetchInternData = async () => {
			try {
				const response = await serverFetch(`/interns/${displayId}`);
				if (!response.ok) {
					throw new Error("Failed to fetch intern data");
				}
				const data: TIntern = await response.json();
				setInternData(data);
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

		fetchInternData();
	}, [displayId]);

	return { internData, loading, error };
};
