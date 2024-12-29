import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/User";

interface UserState {
	users: User[];
	status: "idle" | "loading" | "fullfilled" | "rejected";
	error: string | null;
}

const initialState: UserState = {
	users: [],
	status: "idle",
	error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/users");
	const data = await response.json();
	return data.map((user: User) => ({ ...user, isLiked: false }));
});

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		toggleLike: (state, action: PayloadAction<number>) => {
			const user = state.users.find((user) => user.id === action.payload);
			if (user) {
				user.isLiked = !user.isLiked;
			}
		},
		updateUser: (state, action: PayloadAction<User>) => {
			const index = state.users.findIndex(
				(user) => user.id === action.payload.id,
			);
			if (index !== -1) {
				state.users[index] = {
					...state.users[index],
					...action.payload,
				};
			}
		},

		removeUser: (state, action: PayloadAction<number>) => {
			state.users = state.users.filter(
				(user) => user.id !== action.payload,
			);
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.status = "fullfilled";
				state.users = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.error.message || "Failed to fetch users";
			});
	},
});

export const { toggleLike, updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;