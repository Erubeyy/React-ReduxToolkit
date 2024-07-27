import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { useUserActions } from "../hooks/useUserActions";

export const CreateNewUser = () => {
	const { handleAddUser } = useUserActions();
	const [result, setResult] = useState<"ok" | "Not ok" | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setResult(null);

		const form = event.currentTarget;
		const formData = new FormData(form);
		const fields = Object.fromEntries(formData);

		if (!fields.name || !fields.email || !fields.github) {
			form.reset();
			return setResult("Not ok");
		}

		handleAddUser({
			name: fields.name as string,
			email: fields.email as string,
			github: fields.github as string,
		});

		setResult("ok");
		form.reset();
	};

	return (
		<Card style={{ marginTop: "40px", width: "100%", maxWidth: "300px" }}>
			<Title>Create New User</Title>
			<form
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "20px",
					marginTop: "20px",
				}}
				onSubmit={handleSubmit}
			>
				<TextInput name="name" placeholder="name..." />
				<TextInput name="email" placeholder="email..." />
				<TextInput name="github" placeholder="github user..." />

				<div>
					<Button type="submit">Create User</Button>
					<span>
						{result === "ok" && (
							<Badge color="green">User Succesfully Stored!</Badge>
						)}
						{result === "Not ok" && (
							<Badge color="red">Error Adding User</Badge>
						)}
					</span>
				</div>
			</form>
		</Card>
	);
};
