"use client";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import HeroSection from "@/layouts/home/HeroSection";
import ArticleSection from "@/layouts/home/ArticleSection";

export default function Page() {
	return (
		<div>
			<Header />
			<main>
				<HeroSection />
				<ArticleSection />
				<Footer />
			</main>
		</div>
	)
}

