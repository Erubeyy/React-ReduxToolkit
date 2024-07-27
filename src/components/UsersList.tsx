// 'use client';
import {
	Badge,
	Card,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	Title,
} from "@tremor/react";
import { useAppSelector } from "../hooks/store";
import { useUserActions } from "../hooks/useUserActions";
import { DeleteIcon, EditIcon } from "../icons";

export default function UsersList() {
	const users = useAppSelector((state) => state.users);
	const { handleDeleteUserById } = useUserActions();

	return (
		<>
			<Card>
				<Title style={{ display: "flex", gap: "5px" }}>
					Users
					<Badge>{users.length}</Badge>
				</Title>
				<Table>
					<TableHead>
						<TableRow>
							<TableHeaderCell> ID </TableHeaderCell>
							<TableHeaderCell> Name </TableHeaderCell>
							<TableHeaderCell> Email </TableHeaderCell>
							<TableHeaderCell> Actions </TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((item) => (
							<TableRow key={item.name}>
								<TableCell>{item.id}</TableCell>
								<TableCell
									style={{ display: "flex", gap: "10px", alignItems: "center" }}
								>
									<img
										style={{
											width: "32px",
											height: "32px",
											borderRadius: "50%",
										}}
										src={`https://unavatar.io/github/${item.github}`}
										alt={item.name}
									/>
									{item.name}
								</TableCell>
								<TableCell>{item.email}</TableCell>
								<TableCell>
									<button type="button">
										<EditIcon />
									</button>
									<button
										type="button"
										onClick={() => handleDeleteUserById(item.id)}
									>
										<DeleteIcon />
									</button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>
		</>
	);
}
