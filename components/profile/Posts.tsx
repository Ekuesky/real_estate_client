import React from "react";
import { TabsContent } from "@/components/ui/tabs";

function Posts(props) {
	return (
		<TabsContent value="posts">
			<div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
				<h3 className="h3-semi-bold dark:text-platinum"> Text placeholders</h3>
			</div>
		</TabsContent>
	);
}

export default Posts;