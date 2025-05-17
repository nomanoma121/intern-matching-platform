import { useState, useEffect } from 'react';
import { serverFetch } from '@/utils/fetch';

type ProfileType = "INTERN" | "COMPANY";

export const useProfileList = (profileType: ProfileType) => {
  const [profileList, setProfileList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const endpoint = profileType === "INTERN" ? "/interns" : "/companies";

  useEffect(() => {
    const fetchProfileList = async () => {
      try {
        const response = await serverFetch(endpoint, {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setProfileList(data);
        } else {
          throw new Error('Failed to fetch profile list');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileList();
  }, []);

  return { profileList, loading, error };
}
