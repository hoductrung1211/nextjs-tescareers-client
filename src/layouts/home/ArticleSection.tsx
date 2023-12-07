import Card from "@/components/home/Card";
import SectionTitle from "@/components/home/SectionTitle";
import thumbnail01 from "@/assets/card_01.jpg";
import thumbnail02 from "@/assets/card_02.jpg";
import thumbnail03 from "@/assets/card_03.jpg";
import thumbnail04 from "@/assets/card_05.jpg";

export default function ArticleSection() {
    return (
        <section className="py-12">
			<div className="container flex flex-col gap-4">
				<SectionTitle>Cuộc sống tại TeS</SectionTitle>
				<div className="flex gap-5">
					<Card
						title="Quyền lợi"
						shortContent="Tìm hiểu các quyền lợi mà TeS đem lại để giúp bạn và gia đình bạn sống tốt."
						thumnailSrc={thumbnail01}
					/>
					<Card
						title="Văn hóa công ty"
						shortContent="Chúng ta sẽ chỉ đạt được sứ mệnh của mình nếu chúng ta sống theo nền văn hóa của mình, bắt đầu bằng việc áp dụng tư duy phát triển."
						thumnailSrc={thumbnail02}
					/>
					<Card
						title="Hòa nhập"
						shortContent="Chúng tôi cam kết tôn vinh sự đa dạng xung quanh chúng ta và sức mạnh của nó thúc đẩy chúng ta cùng nhau tiến về phía trước."
						thumnailSrc={thumbnail03}
					/>
					<Card
						title="Linh hoạt trong công việc"
						shortContent="Tại TeS, chúng tôi coi trọng tính linh hoạt như một phần của nơi làm việc kết hợp để bạn có thể cảm thấy được trao quyền để thực hiện công việc tốt nhất của mình."
						thumnailSrc={thumbnail04}
					/>
				</div>
			</div>
		</section>
    )
}
 