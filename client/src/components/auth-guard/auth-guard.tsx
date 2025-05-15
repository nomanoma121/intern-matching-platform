"use client";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../provider/auth";

interface Props {
	children: React.ReactNode;
	redirectPath?: string;
}

const UNAUTHENTICATED_PATHS = ["/", "/signup", "/login"];

export const AuthGuard = ({ children, redirectPath = "/" }: Props) => {
	const auth = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	if (!auth.initialized) return null;

	if (!auth.user) {
		if (!UNAUTHENTICATED_PATHS.includes(pathname)) {
			router.push(redirectPath);
			return null;
		}
	}
	return <>{children}</>;
};
