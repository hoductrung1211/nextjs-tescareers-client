"use client";
import { getPersonalInfo, updatePersonalInfo } from "@/apis/candidate";
import Field from "@/components/Field";
import useAlert from "@/hooks/useAlert";
import useConfirm from "@/hooks/useConfirm";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import Sidebar from "@/layouts/Sidebar";
import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const setLoading = useLoadingAnimation();
	const setAlert = useAlert();
	const confirm = useConfirm();
	const router = useRouter();
	const alert = useAlert();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null);
	const [sex, setSex] = useState(true);
	const [placeOfOrigin, setPlaceOfOrigin] = useState("");
	const [address, setAddress] = useState("");
	const [identityCard, setIdentityCard] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	useEffect(() => {
		fetchData();
	}, []);

	async function fetchData() {
		setLoading(true);
		try {
			const { data } = await getPersonalInfo();
			setFirstName(data.user.firstName);
			setLastName(data.user.lastName);
			setDateOfBirth(dayjs(data.user.dateOfBirth));
			setSex(data.user.sex);
			setPlaceOfOrigin(data.user.placeOfOrigin);
			setAddress(data.user.address);
			setIdentityCard(data.user.identityCard);
			setEmail(data.user.email);
			setPhoneNumber(data.user.phoneNumber);
		}
		catch (ex) {
			setAlert({
				message: "Xảy ra lỗi khi nạp thông tin Hồ sơ cá nhân!",
				severity: "error"
			});
		}
		finally {
			setLoading(false);
		}
	}

	async function handleUpdatePersonalInfo() {
		setLoading(true);
		try {
			await updatePersonalInfo({
				address,
				dateOfBirth: dateOfBirth?.toDate() ?? new Date(),
				email,
				firstName,
				identityCard,
				lastName,
				phoneNumber,
				placeOfOrigin,
				sex
			});

			setAlert({
				message: "Cập nhật thông tin cá nhân thành công!",
				severity: "success"
			});

			router.push("/profile");
		}
		catch (ex) {
			setAlert({
				message: "Xảy ra lỗi khi cập nhật thông tin cá nhân!",
				severity: "error"
			});
		}
		finally {
			setLoading(false);
		}
	}

	return (
		<div className="mt-4 mb-20">
			<div className="container flex gap-4">
				<Sidebar />
				<main className="w-full flex flex-col gap-8 ">
					<section className=" p-6 pt-4 pb-10 flex flex-col gap-4 bg-white rounded-lg border">
						<div className="flex justify-between items-center">
							<h2 className=" text-lg font-semibold text-primary">Thông tin cá nhân</h2>
						</div>
						<Field label="Tên">
							<TextField
								fullWidth
								value={firstName}
								onChange={e => {
									const value = e.target.value;

									if (value === "" || !Number.parseInt(value)) {
										setFirstName(value);
									}
								}}
							/>
						</Field>

						<Field label="Họ và tên đệm">
							<TextField
								fullWidth
								value={lastName}
								onChange={e => {
									const value = e.target.value;

									if (value === "" || !Number.parseInt(value)) {
										setLastName(value);
									}
								}}
							/>
						</Field>

						<Field label="Ngày sinh">
							<DatePicker
								className="w-full"
								maxDate={dayjs()}
								value={dateOfBirth}
								onChange={setDateOfBirth}
							/>
						</Field>

						<Field label="Quê quán">
							<TextField
								fullWidth
								value={placeOfOrigin}
								onChange={e => setPlaceOfOrigin(e.target.value)}
							/>
						</Field>

						<Field label="Địa chỉ">
							<TextField
								fullWidth
								value={address}
								onChange={e => setAddress(e.target.value)}
							/>
						</Field>

						<Field label="Số CMND/Thẻ căn cước">
							<TextField
								fullWidth
								value={identityCard}
								onChange={e => {
									const value = e.target.value;
									if (value.length < 13 && (Number.parseInt(value) || value === "")) {
										setIdentityCard(value);
									}
								}}
							/>
						</Field>

						<Field label="Email">
							<TextField
								fullWidth
								type="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</Field>

						<Field label="Số điện thoại">
							<TextField
								fullWidth
								type="tel"
								value={phoneNumber}
								onChange={e => {
									const value = e.target.value;
									if (value.length < 11 && (Number.parseInt(value) || value === "")) {
										setPhoneNumber(value);
									}
								}}
							/>
						</Field>
					</section>
					<section className="flex items-center justify-end gap-6">
						<Button
							size="large"
							variant="outlined"
							className="font-semibold"
							onClick={() => {
								confirm("Những thông tin bị thay đổi sẽ không được lưu lại?", () => {
									router.push("/profile");
								});
							}}
						>
							Hủy
						</Button>
						<Button
							size="large"
							variant="contained"
							className="bg-primary font-semibold"
							onClick={() => {
								confirm("Bạn có chắc chắn thay đổi thông tin cá nhân?", () => {
									handleUpdatePersonalInfo();
								});
							}}
						>
							Lưu
						</Button>
					</section>
				</main>
			</div>
		</div>
	)
}