import React, { useState } from "react";
import { User } from "../types/User";
import { motion } from "framer-motion";
import { Edit, Globe, Heart, Mail, Pencil, Phone, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike, updateUser, removeUser } from "../store/userSlice";
import EditUserModel from "./EditUserModel";
import { RootState } from "../store/store";

interface UserCardProps {
	user: User;
	index: number;
}

export default function UserCard({ user, index }: UserCardProps) {
	const [isEdit, setIsEdit] = useState(false);
	const name = useSelector(
		(state: RootState) => state.users.users[index].name,
	);
	const [avatarUrl, setAvatarUrl] = useState(
		`https://api.dicebear.com/9.x/lorelei/svg?seed=${encodeURIComponent(
			user.username || user.email || user.id.toString(),
		)}`,
	);
	const dispatch = useDispatch();

	const handleLike = () => {
		dispatch(toggleLike(user.id));
	};

	const handleEdit = (updatedUser: User) => {
		if (updatedUser.username !== user.username) {
			const newAvatarUrl = `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(
				updatedUser.username ||
					updatedUser.email ||
					updatedUser.id.toString(),
			)}`;
			setAvatarUrl(newAvatarUrl);
		}
		dispatch(updateUser(updatedUser));
	};

	const handleDelete = () => {
		dispatch(removeUser(user.id));
	};
	return (
		<>
			<div className="bg-white rounded-lg shadow-lg w-full max-w-sm overflow-hidden">
				<div className="p-4 space-y-6">
					<div className="flex items-center flex-col space-y-4">
						<div className="w-32 h-32 rounded-full bg-gray-300">
							<img
								src={`https://api.dicebear.com/9.x/big-smile/svg?seed=${name}`}
								alt="avatar"
								className="w-full h-full object-cover rounded-full"
							/>
						</div>
						<h2 className="text-2xl font-bold text-gray-800">
							{user.name}
						</h2>
					</div>

					<div className="space-y-2">
						<div className="flex text-gray-800 items-center gap-3">
							<Mail size={24} />
							<span className="ml-2 text-sm">{user.email}</span>
						</div>
						<div className="flex text-gray-800 items-center gap-3">
							<Phone size={24} />
							<span className="ml-2 text-sm">{user.phone}</span>
						</div>
						<div className="flex text-gray-800 items-center gap-3">
							<Globe size={24} />
							<span className="ml-2 text-sm">{user.website}</span>
						</div>
					</div>

					<div className="grid grid-cols-3 border-t border-gray-300">
						<button
							onClick={handleLike}
							title="Like"
							className={`p-4 flex justify-center items-center border-gray-800 text-gray-800  hover-bg-gray-100 transition-colors ${
								user.isLiked ? "text-red-500" : "text-gray-400"
							}`}
						>
							<Heart
								className="w-5 h-5"
								fill={user.isLiked ? "currentColor" : "none"}
							/>
						</button>
						<button
							onClick={() => setIsEdit(!isEdit)}
							title="Edit"
							className="p-4 flex justify-center items-center hover-bg-gray-100 transition-colors border-l border-r border-gray-300 hover:text-sky-600"
						>
							<Pencil className="w-5 h-5" />
						</button>

						<button
							onClick={handleDelete}
							title="Delete"
							className="p-4 flex justify-center text-gray-800 items-center hover-bg-gray-100 transition-colors hover:text-sky-600"
						>
							<Trash2 className="w-5 h-5" />
						</button>
					</div>
				</div>
			</div>
			{isEdit && (
				<EditUserModel
					user={user}
					onClose={() => setIsEdit(false)}
					onSave={handleEdit}
				/>
			)}
		</>
	);
}
