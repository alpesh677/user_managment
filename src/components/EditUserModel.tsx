import React, { useState } from "react";
import { User } from "../types/User";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface EditUserModelProps {
	user: User;
	onSave: (updatedUser: User) => void;
	onClose: () => void;
}

export default function EditUserModel({
	user,
	onSave,
	onClose,
}: EditUserModelProps) {
	const [formData, setFormData] = useState<User>(user);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formData);
		onClose();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name.includes(".")) {
			const [parent, child] = name.split(".");
			setFormData((prev) => ({
				...prev,
				[parent]: {
					...(prev[parent as keyof User] as object),
					[child]: value,
				},
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};


	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto"
			>
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.9, opacity: 0 }}
					className="bg-white w-full max-w-md p-4 sm:p-6 rounded-lg shadow-lg my-8"
				>
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-2xl font-semibold">Edit User</h2>
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							onClick={onClose}
							className="text-gray-500 hover:text-gray-700"
						>
							<X onClick={onClose} size={20} />
						</motion.button>
					</div>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="">
							<label
								htmlFor="name"
								className="block text-sm font-bold text-gray-700"
							>
								Name
							</label>
							<motion.input
								whileFocus={{ scale: 1.02 }}
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-x-indigo-400 sm:text-sm p-1"
							/>
						</div>
						<div className="">
							<label
								htmlFor="email"
								className="block text-sm font-bold text-gray-700"
							>
								Email
							</label>
							<motion.input
								whileFocus={{ scale: 1.05 }}
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1"
							/>
						</div>

						<div className="">
							<label
								htmlFor="name"
								className="block text-sm font-bold text-gray-700"
							>
								Phone
							</label>
							<motion.input
								whileFocus={{ scale: 1.05 }}
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								required
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1"
							/>
						</div>
						<div className="">
							<label
								htmlFor="website"
								className="block text-sm font-bold text-gray-700"
							>
								Website :
							</label>
							<motion.input
								whileFocus={{ scale: 1.05 }}
								type="text"
								name="website"
								value={formData.website}
								onChange={handleChange}
								required
								className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1"
							/>
						</div>

						<div className="flex flex-col sm:flex-row  justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.9 }}
								type="button"
								onClick={onClose}
								className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
							>
								Cancel
							</motion.button>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.9 }}
								type="submit"
								className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
							>
								Save Changes
							</motion.button>
						</div>
					</form>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
