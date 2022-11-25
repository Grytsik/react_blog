
export default function EditBlock({
	editTitle,
	setEditTitle,
	valueEdit,
	setValueEdit,
	children}) {
	return (
		<div className="edit__block">
			<input
				className="edit__text"
				id="title"
				type="text"
				placeholder="Your title..."
				onChange={(e) => setEditTitle(e.target.value)}
				value={editTitle}
			/>
			<textarea
				className="edit__area"
				id="text"
				placeholder="Your text..."
				onChange={(e) => setValueEdit(e.target.value)}
				value={valueEdit}
			/>
			{children}
		</div>
	)
}