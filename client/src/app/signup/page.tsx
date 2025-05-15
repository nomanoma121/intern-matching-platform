"use client";

import { css } from "@styled-system/css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useCallback } from "react";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input";
import { useAuth } from "../../provider/auth";
import { serverFetch } from "../../utils/fetch";

type SignUpFormStateType = {
	message: string;
};

const SignUp = () => {
	const { setUser } = useAuth();
	const router = useRouter();

	const SignUpFormAction = useCallback(
		async (
			_prevState: SignUpFormStateType,
			formData: FormData,
		): Promise<SignUpFormStateType> => {
			const displayId = formData.get("display_id");
			const email = formData.get("email");
			const password = formData.get("password");
			const role = formData.get("role");

			if (
				displayId === null ||
				email === null ||
				password === null ||
				role === null
			) {
				return { message: "メールアドレスとパスワードを入力してください" };
			}

			if (
				typeof displayId !== "string" ||
				typeof email !== "string" ||
				typeof password !== "string" ||
				typeof role !== "string"
			) {
				return { message: "不正な入力です" };
			}

			if (password.length < 8) {
				return { message: "パスワードは8文字以上で入力してください" };
			}

			const res = await serverFetch("/auth/signup", {
				method: "POST",
				body: JSON.stringify({
					user: { display_id: displayId, email, password, role },
				}),
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
				message: "登録に失敗しました",
			};
		},
		[setUser, router],
	);

	const [error, submitAction, isPending] = useActionState(SignUpFormAction, {
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
			<h1>SignUp</h1>
			<table className={css({ margin: "16px 0" })}>
				<tbody>
					<tr>
						<td>名前</td>
						<td>
							<Input type="text" name="display_id" required />
						</td>
					</tr>
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
					<tr>
						<td>企業 or 学生</td>
						<td>
							<select name="role" required>
								<option value="COMPANY">企業</option>
								<option value="INTERN">学生</option>
							</select>
						</td>
					</tr>
				</tbody>
			</table>
			<Button type="submit" disabled={isPending}>
				登録
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
				アカウントをお持ちの方は
				<Link href="/login">こちら</Link>
			</p>
		</form>
	);
};

export default SignUp;
