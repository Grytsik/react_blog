import userlogo from '../../img/no-avatar.jpeg';

export default function AnonimUser({className}) {
	return (
		<>
			<img
				className={className}
				src={userlogo}
				alt="anon"
			/>
		</>
	)
}