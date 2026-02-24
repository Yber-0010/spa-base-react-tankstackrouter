interface TicketsProps {
	metaData?: { title?: string }
}

export const Tickets = ({ metaData }: TicketsProps) => {
	return (
		<>
			{metaData?.title && <title>{metaData.title}</title>}
			<div>Tickets</div>
		</>
	)
}

export default Tickets
