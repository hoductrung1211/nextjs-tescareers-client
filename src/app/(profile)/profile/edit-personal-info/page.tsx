"use client";
import Field from "@/components/Field";
import IconButton from "@/components/IconButton";
import useAlert from "@/hooks/useAlert";
import useConfirm from "@/hooks/useConfirm";
import Sidebar from "@/layouts/Sidebar";
import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IEditText {
	key: string;
	label: string;
	value: string;
}

interface IEditDatePicker {
	key: string;
	label: string;
	value: Dayjs | null;
}

interface IEditRadio {
	key: string;
	label: string;
	value: string;
	radios: {
		label: string;
		value: string;
	}[];
}

type IEditInfo = IEditText | IEditDatePicker | IEditRadio;

export default function Page() {
	const confirm = useConfirm();
	const router = useRouter();
	const alert = useAlert();

	const [firstName, setFirstName] = useState("Trung");
	const [lastName, setLastName] = useState("Hồ Đức");
	const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(dayjs("12/11/2001"));
	const [sex, setSex] = useState(true);
	const [placeOfOrigin, setPlaceOfOrigin] = useState("");
	const [address, setAddress] = useState("");
	const [identityCard, setIdentityCard] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

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
									alert({
										message: "Cập nhật thông tin cá nhân thành công!",
										severity: "success"
									});

									router.push("./");
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