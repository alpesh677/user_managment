import { useEffect, useState } from "react";

import "./App.css";
import { AppDispatch, RootState } from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./store/userSlice";
import { motion } from "framer-motion";
import UserCard from "./components/UserCard";
import EmptyState from "./components/EmptyState";

function App() {
	const dispatch = useDispatch<AppDispatch>();
	const { users, status, error } = useSelector(
		(state: RootState) => state.users,
	);

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchUsers());
		}
	}, [dispatch, status]);

	if (status === "loading") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					className="text-xl font-semibold text-blue-600"
				>
					Loading...
				</motion.div>
			</div>
		);
	}

	if (status === "rejected") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					className="text-xl font-semibold text-red-500"
				>
					Error: {error}
				</motion.div>
			</div>
		);
	}
	return (
		<div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50">
			<div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
				<motion.h1
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-6 md:mb-8 text-center"
				>
					User Management
				</motion.h1>
				{users.length === 0 ? (
					<div className="max-w-lg mx-auto">
						<EmptyState />
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
						{users.map((user, index) => (
							<UserCard key={user.id} user={user} index={index} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
