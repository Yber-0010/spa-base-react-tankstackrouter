interface UsersProps {
	metaData?: { title?: string }
}

export const Users = ({ metaData }: UsersProps) => {
	return (
		<>
			{metaData?.title && <title>{metaData.title}</title>}
			<div>Users</div>
		</>
	)
}

export default Users
