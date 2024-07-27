import { type Middleware, configureStore } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducer, { type UserWithId, rollBackUser } from "./users/slice";

const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		try {
			localStorage.setItem(
				"__redux__state__",
				JSON.stringify(store.getState()),
			);
		} catch (e) {
			console.error("Could not save state", e);
		}
	};

const syncWithDatabaseMiddleware: Middleware =
	(store) => (next) => (action) => {
		const { type, payload } = action;
		const previousState = store.getState();

		// Tell the action to continue the execution
		next(action);

		// After the execution of the reducer Do Something...
		if (type === "users/deleteUserById") {
			const userId = payload;
			const userToDelete = previousState.users.find(
				(user: UserWithId) => user.id === userId,
			);

			fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
				method: "DELETE",
			})
				.then((res) => {
					if (res.ok) {
						toast.success("User Deleted");
					} else {
						throw new Error("Error Deleting User");
					}
				})
				.catch((err) => {
					toast.error(`Error Deleting User ${userId}`);
					if (userToDelete) store.dispatch(rollBackUser(userToDelete));
					console.log(err);
				});
		}
	};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(
			persistanceLocalStorageMiddleware,
			syncWithDatabaseMiddleware,
		);
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
