import Icon from "@/components/Icon";
import IconButton from "@/components/IconButton";
import Sidebar from "@/layouts/Sidebar";
import { Chip } from "@mui/material";

export default function Page() {

    const fields = [
        {
            icon: "user-tie",
            title: "Vai trò",
            value: "Nhà phát triển giao diện web - front-end developer",
        },
        {
            icon: "money-bill",
            title: "Khung lương",
            value: "7.000.000 VND",
        },
        {
            icon: "briefcase",
            title: "Loại hợp đồng",
            value: "Toàn thời gian",
        },
        {
            icon: "building-user",
            title: "Nơi làm việc",
            value: "Từ xa",
        },
    ]

    return (
        <div className="mt-4 mb-20">
            <div className="container flex gap-4">
                <Sidebar activeNav={3} />
                <main className="w-full p-6 pt-4 flex flex-col gap-4 bg-white rounded-lg border">
                    <h2 className="text-lg font-semibold text-primary">Lịch sử ứng tuyển</h2>
                    <div className="p-4 border rounded-md">
                        <h3 className="uppercase font-semibold cursor-pointer">
                            KỸ THUẬT VIÊN PHỤC HỒI CHỨC NĂNG CHO TRẺ
                        </h3>
                        <div className="mt-6 flex gap-4">
                            <section className="w-2/3 flex flex-col gap-3">
                                <div className="flex-shrink-0 flex flex-col  ">
                                    {
                                        fields.map(field => (
                                            <div key={field.title} className="mb-4 min-w-[50%] flex items-start">
                                                <section className="flex-shrink-0 w-48 flex items-center gap-2">
                                                    <div className="h-10 w-10 rounded-full grid place-items-center bg-gray-200">
                                                        <Icon name={field.icon} />
                                                    </div>
                                                    <h6 className="font-semibold">{field.title}:</h6>
                                                </section>
                                                {
                                                    typeof field.value == "string" ?
                                                        <p className="mt-2">{field.value}</p> :
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            {
                                                                field.value
                                                            }
                                                        </div>
                                                }
                                            </div>
                                        ))
                                    }

                                </div>
                            </section>
                            <section className="w-1/3 bg-gray-200">
                                <p>Ngày ứng tuyển: 20/11/2023</p>
                                <p>Trạng thái mới nhất: Rớt</p>
                                <p>Xem thêm</p>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}