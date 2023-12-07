import Image, { StaticImageData } from "next/image"

interface ICardProps {
	title: string,
	thumnailSrc: StaticImageData,
	shortContent: string,
	onClick?: () => void
}

export default function Card({
	title,
	thumnailSrc: imgSrc,
	shortContent,

}: ICardProps) {
	return (
		<div className="w-full flex flex-col bg-white border border-grey rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-95 hover:shadow-sm transition">
			<section className="h-44 bg-slate-100 overflow-hidden">
				<Image
					src={imgSrc}
					alt={'Card Image'}
				/>
			</section>
			<section className="p-4">
				<h4 className="font-semibold">
					{title}
				</h4>
				<p className="mt-2 text-[#12px]">
					{shortContent}
				</p>
			</section>
		</div>
	)
}