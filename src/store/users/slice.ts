import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
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
		github: "diego",
	},
	{
		id: "5",
		name: "Amanda Estrada",
		email: "amanda@gmail.com",
		github: "Amanda",
	},
];

export type UserId = string;

export type User = {
	name: string;
	email: string;
	github: string;
};

export type UserWithId = User & {
	id: UserId;
};

const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	if (persistedState) {
		return JSON.parse(persistedState).users;
	}

	return DEFAULT_STATE;
})();

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			return [...state, { id, ...action.payload }];
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollBackUser: (state, action: PayloadAction<UserWithId>) => {
			const userExist = state.some((user) => user.id === action.payload.id);
			if (!userExist) {
				return [...state, action.payload];
			}
		},
	},
});

export const { addNewUser, deleteUserById, rollBackUser } = usersSlice.actions;

export default usersSlice.reducer;
