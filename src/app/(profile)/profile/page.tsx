import Field from "@/components/Field";
import IconButton from "@/components/IconButton";
import Sidebar from "@/layouts/Sidebar";
import { Chip } from "@mui/material";

export default function Page() {
    const personalInfo = [
        {
            label: "Họ và tên",
            value: "Hồ Đức Trung",
        },
        {
            label: "Ngày sinh",
            value: "12/11/2001",
        },
        {
            label: "Giới tính",
            value: "Nam",
        },
        {
            label: "Quê quán",
            value: "Nam Cường, Nam Đàn, Nghệ An",
        },
        {
            label: "Địa chỉ",
            value: "Quận Thủ Đức, Thành phố Hồ Chí Minh",
        },
        {
            label: "Quê quán",
            value: "Nam",
        },
        {
            label: "Số CMND/Thẻ căn cước",
            value: "02511368725",
        },
        {
            label: "Email",
            value: "hoductrung2604@gmail.com",
        },
        {
            label: "Số điện thoại",
            value: "0943394369",
        },
    ]

    const profile = [
        {
            label: "Giới thiệu bản thân",
            value: "Là một chuyên gia CNTT dày dạn kinh nghiệm với hơn một thập kỷ kinh nghiệm, tôi đã mài giũa kỹ năng quản trị hệ thống và quản lý mạng của mình. Cách tiếp cận chủ động của tôi trong việc giải quyết vấn đề và kiến thức chuyên sâu về an ninh mạng khiến tôi trở thành tài sản quý giá trong việc đảm bảo cơ sở hạ tầng CNTT hoạt động liền mạch.",
        },
        {
            label: "Bằng cấp",
            value: "Đại học",
        },
        {
            label: "Kinh nghiệm",
            value: "Dưới 1 năm",
        },
        {
            label: "Trường học",
            value: "Học viện công nghệ bưu chính viễn thông",
        },
        {
            label: "Kỹ năng",
            value: [
                {
                    id: 1,
                    text: "C#",
                },
                {
                    id: 2,
                    text: "Java",
                },
                {
                    id: 3,
                    text: "JavaScript",
                },
                {
                    id: 4,
                    text: "Python",
                },
            ],
        },
    ]

    return (
        <div className="mt-4 mb-20">
            <div className="container flex gap-4">
                <Sidebar />
                <main className="w-full flex flex-col gap-8 ">
                    <section className=" p-6 pt-4 pb-10 flex flex-col gap-4 bg-white rounded-lg border">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-primary">Thông tin cá nhân</h2>
                            <IconButton
                                name="pen-to-square"
                                href="profile/edit-personal-info"
                            />
                        </div>
                        {
                            personalInfo.map(field => (
                                <Field label={field.label}>
                                    {field.value}
                                </Field>
                            ))
                        }
                    </section>
                    <section className=" p-6 pt-4 pb-10 flex flex-col gap-4 bg-white rounded-lg border">
                        <div className="flex justify-between items-center">
                            <h2 className="font-semibold text-lg text-primary">Hồ sơ</h2>
                            <IconButton
                                name="pen-to-square"
                                href="profile/edit-profile"
                            />
                        </div>
                        {
                            profile.map(field => (
                                <Field label={field.label} align="start">
                                    {
                                        typeof field.value == "string" ?
                                            field.value :
                                            <div className="flex flex-wrap gap-4">
                                                {
                                                    field.value.map(val => (
                                                        <Chip key={val.id} label={val.text} />
                                                    ))
                                                }
                                            </div>
                                    }
                                </Field>
                            ))
                        }
                    </section>
                </main>
            </div>
        </div>
    )
}