"use client";

import { css } from "@styled-system/css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useCallback, useState } from "react";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input";
import { useAuth } from "../../provider/auth";
import { serverFetch } from "../../utils/fetch";

type SignUpFormStateType = {
	message: string;
};

// Define a specific type for the user payload
type UserSignupPayload = {
	display_id: string;
	email: string;
	password: string;
	role: "COMPANY" | "INTERN";
	company_name?: string;
	company_description?: string;
	university?: string;
	grade?: string;
	skills?: string;
};

const SignUp = () => {
	const { setUser } = useAuth();
	const router = useRouter();
	const [role, setRole] = useState<string>("COMPANY");

	const SignUpFormAction = useCallback(
		async (
			_prevState: SignUpFormStateType,
			formData: FormData,
		): Promise<SignUpFormStateType> => {
			const displayId = formData.get("display_id");
			const email = formData.get("email");
			const password = formData.get("password");
			const roleValue = formData.get("role"); // Renamed for clarity

			if (
				displayId === null ||
				email === null ||
				password === null ||
				roleValue === null
			) {
				return { message: "必須項目をすべて入力してください" };
			}

			if (
				typeof displayId !== "string" ||
				typeof email !== "string" ||
				typeof password !== "string" ||
				typeof roleValue !== "string" || // Ensure roleValue is a string
				(roleValue !== "COMPANY" && roleValue !== "INTERN") // Validate specific role values
			) {
				return { message: "不正な入力です" };
			}

			// Now roleValue is confirmed to be "COMPANY" | "INTERN"
			const currentRole = roleValue as "COMPANY" | "INTERN";

			if (password.length < 8) {
				return { message: "パスワードは8文字以上で入力してください" };
			}

			const userPayload: UserSignupPayload = {
				// Use the specific UserSignupPayload type
				display_id: displayId,
				email: email,
				password: password,
				role: currentRole, // Assign the validated and typed role
			};

			if (currentRole === "COMPANY") {
				const companyName = formData.get("company_name");
				const companyDescription = formData.get("company_description");
				// Assuming text inputs, if not null, they are strings. FormDataEntryValue is string | File.
				if (
					companyName === null ||
					companyDescription === null ||
					typeof companyName !== "string" ||
					typeof companyDescription !== "string"
				) {
					return { message: "企業情報を正しく入力してください" };
				}
				userPayload.company_name = companyName;
				userPayload.company_description = companyDescription;
			} else if (currentRole === "INTERN") {
				// currentRole is "INTERN"
				const university = formData.get("university");
				const grade = formData.get("grade");
				const skills = formData.get("skills");
				if (
					university === null ||
					grade === null ||
					skills === null ||
					typeof university !== "string" ||
					typeof grade !== "string" ||
					typeof skills !== "string"
				) {
					return { message: "学生情報を正しく入力してください" };
				}
				userPayload.university = university;
				userPayload.grade = grade;
				userPayload.skills = skills;
			}

			const res = await serverFetch("/auth/signup", {
				method: "POST",
				body: JSON.stringify({
					user: userPayload,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (res.ok) {
				const data = await res.json();
				if (data.user?.token) {
					localStorage.setItem("token", data.user.token);
					setUser(data.user);
				} else if (data.token) {
					localStorage.setItem("token", data.token);
					setUser(data.user || data);
				} else {
					setUser(data.user || data);
					router.push("/home");
					return {
						message: "登録に成功しましたが、自動ログインに失敗しました。",
					};
				}
				router.push("/home");
				return { message: "" };
			}

			const errorData = await res.json().catch(() => ({
				message: "登録に失敗しました",
			}));
			return {
				message:
					errorData.errors?.body?.join(", ") ||
					errorData.message ||
					"登録に失敗しました",
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
							<select
								name="role"
								required
								value={role}
								onChange={(e) => setRole(e.target.value)}
								className={css({
									width: "100%",
									padding: "8px",
									boxSizing: "border-box",
								})}
							>
								<option value="COMPANY">企業</option>
								<option value="INTERN">学生</option>
							</select>
						</td>
					</tr>
					{role === "COMPANY" && (
						<>
							<tr>
								<td>会社名</td>
								<td>
									<Input type="text" name="company_name" required />
								</td>
							</tr>
							<tr>
								<td>会社説明</td>
								<td>
									<textarea
										name="company_description"
										required
										className={css({
											width: "100%",
											padding: "8px",
											boxSizing: "border-box",
											minHeight: "80px",
											border: "1px solid token(colors.gray.300)",
											borderRadius: "md",
										})}
									/>
								</td>
							</tr>
						</>
					)}
					{role === "INTERN" && (
						<>
							<tr>
								<td>大学名</td>
								<td>
									<Input type="text" name="university" required />
								</td>
							</tr>
							<tr>
								<td>学年</td>
								<td>
									<Input type="text" name="grade" required />
								</td>
							</tr>
							<tr>
								<td>スキル</td>
								<td>
									<textarea
										name="skills"
										required
										className={css({
											width: "100%",
											padding: "8px",
											boxSizing: "border-box",
											minHeight: "80px",
											border: "1px solid token(colors.gray.300)",
											borderRadius: "md",
										})}
									/>
								</td>
							</tr>
						</>
					)}
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
