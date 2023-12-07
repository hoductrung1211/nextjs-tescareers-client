import Image from "next/image";
import heroImgSrc from "@/assets/hero_01.png";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function HeroSection() {
    return (
        <section className="bg-foreground">
			<div className="container flex justify-between">
				<div className="flex-shrink-0 flex flex-col justify-center">
					<h2 className="mb-9 text-4xl font-medium">Tạo ra tương lai bạn muốn</h2>
					<p className="mb-4 text-xl">Tìm công việc tiếp theo của bạn tại <span className="text-green-sea font-bold">TeS</span></p>
					<TextField
						placeholder="Nhập công việc bạn muốn tìm kiếm..."
						InputProps={{
							startAdornment: (
								<InputAdornment position="start" >
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								</InputAdornment>
							)
						}} 
					/>
				</div>
				<div className="w-1/2">
					<Image
						src={heroImgSrc}
						alt="Hero image"
					/>
				</div>
			</div>
		</section>
    )
}
 