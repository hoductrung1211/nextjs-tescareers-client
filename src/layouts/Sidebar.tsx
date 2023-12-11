import Icon from "@/components/Icon";
import { Avatar } from "@mui/material";
import Link from "next/link";

interface ISidebarProps {
    activeNav?: number;
}

export default function Sidebar({
    activeNav = 1
}: ISidebarProps) {
    const primaryColor = "text-white bg-primary";
    const navs = [
        {
            id: 1,
            text: "Thông tin cá nhân",
            href: "/profile",
            icon: "user",
        },
        {
            id: 2,
            text: "Bài đăng tuyển đã được lưu",
            href: "/saved-posts",
            icon: "bookmark",
        },
        {
            id: 3,
            text: "Lịch sử ứng tuyển",
            href: "/applied-jobs-history",
            icon: "clock",
        },
        {
            id: 4,
            text: "Đổi mật khẩu",
            href: "/change-password",
            icon: "key",
        },
    ];

    let name = "";
    if (localStorage) {
        name = localStorage.getItem("fullName") ?? "";
    }

    return (
        <aside className="sticky top-20 w-120 h-fit p-2 flex flex-col gap-2 rounded-lg border bg-white">
            <div className="h-16 p-4 flex items-center gap-4 bg-gray-50 rounded-md">
                <Avatar>
                    {name[0]}
                </Avatar>
                <p>{name}</p>
            </div>
            {
                navs.map(nav => (
                    <Link
                        key={nav.id}
                        className={(nav.id == activeNav ? primaryColor : " text-slate-600 hover:bg-apple-gray-6 ") + " h-12 px-3 flex items-center gap-3 text-sm font-semibold rounded-md "}
                        href={nav.href}
                    >
                        <Icon className="w-8 grid place-items-center" name={nav.icon} size="xl" />
                        {nav.text}
                    </Link>
                ))
            }
        </aside>
    )
}