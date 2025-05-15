"use client";

import { css } from "@styled-system/css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useCallback } from "react";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input";
import { useAuth } from "../../provider/auth";
import { serverFetch } from "../../utils/fetch";

type LoginFormStateType = {
	message: string;
};

const Login = () => {
	const { setUser } = useAuth();
	const router = useRouter();

	const LoginFormAction = useCallback(
		async (
			_prevState: LoginFormStateType,
			formData: FormData,
		): Promise<LoginFormStateType> => {
			const email = formData.get("email");
			const password = formData.get("password");

			if (email === null || password === null) {
				return { message: "メールアドレスとパスワードを入力してください" };
			}

			if (typeof email !== "string" || typeof password !== "string") {
				return { message: "不正な入力です" };
			}

			// if (password.length < 8) {
			// 	return { message: "パスワードは8文字以上で入力してください" };
			// }

			const res = await serverFetch("/auth/login", {
				method: "POST",
				body: JSON.stringify({ user: { email, password } }),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (res.ok) {
				const data = await res.json();
				localStorage.setItem("token", data.user.token);
				setUser(data.user);
				router.push("/home");
				return { message: "" };
			}

			return {
				message: "ログインに失敗しました",
			};
		},
		[setUser, router],
	);

	const [error, submitAction, isPending] = useActionState(LoginFormAction, {
		message: "",
	});

	return (
		<form
			action={submitAction}
			className={css({
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "white",
				borderRadius: "8px",
				boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
				marginTop: "100px",
			})}
		>
			<h1>Login</h1>
			<table className={css({ margin: "16px 0" })}>
				<tbody>
					<tr>
						<td>メールアドレス</td>
						<td>
							<Input type="email" name="email" required />
						</td>
					</tr>
					<tr>
						<td>パスワード</td>
						<td>
							<Input type="password" name="password" required />
						</td>
					</tr>
				</tbody>
			</table>
			<Button type="submit" disabled={isPending}>
				ログイン
			</Button>
			{error.message && (
				<p
					className={css({
						color: "var(--danger-color)",
						fontSize: "14px",
					})}
				>
					{error.message}
				</p>
			)}
			<p>
				アカウントをお持ちでない場合は
				<Link href="/signup">こちら</Link>
			</p>
		</form>
	);
};

export default Login;
