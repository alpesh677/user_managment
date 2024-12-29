import { Users } from "lucide-react";
import React from "react";

export default function EmptyState() {
	return (
		<div className="w-full flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg">
			<Users size={40} className="text-gray-800 mb-4" />
			<h2 className="text-2xl font-semibold text-gray-700 mb-2">
				No Users Found
			</h2>
			<p className="text-gray-500 text-center">
				There are no users to display. They might have been deleted or
				not loaded properly.
			</p>
		</div>
	);
}
