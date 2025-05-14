import { useRouter } from "next/router";
import { useAuth } from "../../provider/auth";

interface Props {
	children: React.ReactNode;
	redirectPath?: string;
}

export const AuthGuard = ({ children, redirectPath = "/" }: Props) => {
	const auth = useAuth();
	const router = useRouter();
	if (!auth.initialized) return null;
	if (!auth.user) {
		router.push(redirectPath);
		return null;
	}
	return <>{children}</>;
};
