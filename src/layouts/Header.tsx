"use client";
import Login from "@/features/login/Login";
import Signup from "@/features/sign-up/Signup";
import useModal from "@/hooks/useModal";
import Logo from "@/components/Logo";
import Link from "next/link";
import { leftNavigation, userFeatures } from "@/configs/headerNavigation";
import { useEffect, useState } from "react";
import { Avatar, Popover } from "@mui/material";
import Icon from "@/components/Icon";

export default function Header() {

	return (
		<header className="sticky top-0 inset-x-0 bg-foreground z-10 shadow-sm">
			<nav className="flex justify-between w-[1200px] h-16 mx-auto px-3 leading-14 font-semibold">
				<div className="flex gap-10">
					<Logo />
					{
						leftNavigation.map(link =>
							<Link
								className=" border-b-2 border-transparent hover:border-primary transition duration-150"
								key={link.text}
								href={link.href}>
								{link.text}
							</Link>
						)
					}
				</div>
				<HeaderFeatures />
			</nav>
		</header>
	)
}

function HeaderFeatures() {
	const [clientName, setClientName] = useState("");
	const {
		setIsOpenModal,
		setModal
	} = useModal();

	useEffect(() => {
		checkLoggedIn();
	}, []);

	function checkLoggedIn() {
		if (localStorage != null) {
			const role = localStorage.getItem("role");
			const name = localStorage.getItem("fullName");

			if (role == "Client" && name) {
				setClientName(name);
			}
			else setClientName("");
		}
	}

	function handleLogout() {
		localStorage.clear();
		setClientName("");
	}

	const handlePopupLogin = () => {
		setModal({
			children:
				<Login
					onSwitchToSignup={handlePopupSignup}
					onLoginSuccessfully={() => {
						setIsOpenModal(false);
						checkLoggedIn();
					}}
				/>
		})
	}

	const handlePopupSignup = () => {
		setModal({
			children: <Signup onPopupLogin={handlePopupLogin} />
		})
	}

	if (!clientName)
		return (
			<div className="flex gap-10">
				<button
					className="h-full border-b-2 border-transparent hover:border-primary transition duration-150"
					onClick={() => {
						handlePopupLogin();
						setIsOpenModal(true);
					}}
				>
					Đăng nhập
				</button>
				<button
					className="h-full border-b-2 border-transparent hover:border-primary transition duration-150"
					onClick={() => {
						handlePopupSignup();
						setIsOpenModal(true);
					}}
				>
					Đăng ký
				</button>
			</div>
		);

	return (
		<UserUtils
			clientName={clientName}
			handleLogout={handleLogout}
		/>
	)
}

function UserUtils({
	clientName,
	handleLogout
}: {
	clientName: string;
	handleLogout: () => void;
}) {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div className="my-auto h-14 px-4 flex items-center gap-4 rounded-md cursor-pointer">
			<button onClick={handleClick}>
				<Avatar>{clientName[0]}</Avatar>
			</button>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<section className="w-96 p-4 flex flex-col gap-4 bg-gray-50">
					<p className="px-4">Xin chào, <span className="font-semibold">{clientName}</span></p>
					{
						userFeatures.map(feature => (
							<Link className="flex items-center justify-between h-16 px-4 border border-transparent hover:border-gray-200 hover:bg-slate-100 font-semibold rounded-md" href={feature.href}>
								<div className="flex gap-4 items-center">
									<Icon className="w-10 h-10 grid place-items-center rounded-full bg-gray-200" name={feature.icon} size="lg" />
									{feature.text}
								</div>
								<Icon name="angle-right" />
							</Link>
						))
					}
					<button
						className="h-12 border-alizarin bg-alizarin hover:bg-opacity-90 text-white font-semibold rounded-md"
						onClick={handleLogout}
					>
						Đăng xuất
					</button>
				</section>
			</Popover>
		</div>
	)
}