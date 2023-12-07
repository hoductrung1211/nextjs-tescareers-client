export interface ITextProps {
	children: React.ReactNode
}

export default function SectionTitle({
	children
}: ITextProps) {
	return (
		<h2 className="text-xl font-semibold">
			{children}
		</h2>
	)
}