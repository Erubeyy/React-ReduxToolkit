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
import { DeleteIcon, EditIcon } from "../icons";

const users: {
	id: string;
	name: string;
	email: string;
	github: string;
}[] = [
	{
		id: "1",
		name: "John Doe",
		email: "john@hotmail.com",
		github: "johnDev",
	},
	{
		id: "2",
		name: "Erika Gonzalez",
		email: "erika@gmail.com",
		github: "erikaa",
	},
	{
		id: "3",
		name: "Joel Sanchez",
		email: "joel@github.com",
		github: "joelGamer777",
	},
	{
		id: "4",
		name: "Diego Lopez",
		email: "diegooo@gmail.com",
		github: "Diego",
	},
	{
		id: "5",
		name: "Amanda Estrada",
		email: "amanda@gamil.com",
		github: "Amanda",
	},
];

export default function UsersList() {
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
									<button type="button">
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
