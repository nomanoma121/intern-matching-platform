"use client";
import { useRouter } from "next/navigation";
import type React from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import type { TCompany } from "../types/company";
import type { TIntern } from "../types/intern";
import { serverFetch } from "../utils/fetch";

type User = {
	id: number;
	display_id: string; // バックエンドの display_id に合わせる
	email: string;
	role: "COMPANY" | "INTERN";
	company_profile?: TCompany;
	intern_profile?: TIntern;
	token?: string; // ログイン時やサインアップ時にトークンを含むことがあるため
};

type AuthContextType = {
	user: User | null;
	initialized: boolean;
	setUser: (user: User | null) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: React.ReactNode;
}

const fetchUser = async (): Promise<User | null> => {
	const res = await serverFetch("/auth/me");

	if (res.ok) {
		const data = await res.json();
		return data.user; // バックエンドは { user: { ... } } の形式で返すため
	}

	// 認証エラーの場合のみトークンを削除
	if (res.status === 401) {
		localStorage.removeItem("token");
	}

	return null;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [initialized, setInitialized] = useState(false);
	const router = useRouter();

	useEffect(() => {
		fetchUser().then((userData) => {
			setUser(userData);
			setInitialized(true);
		});
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem("token");
		setUser(null);
		router.push("/");
	}, [router]);

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				initialized,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within a AuthProvider");
	}
	return context;
};
