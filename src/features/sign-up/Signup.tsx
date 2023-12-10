"use client";
import signupSrc from "@/assets/signup_01.png";
import Icon from "@/components/Icon";
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function Signup({
    onPopupLogin,
}: {
    onPopupLogin: () => void;
}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

    return (
        <div className="w-[880px] flex gap-20 px-10 py-8 border border-concrete bg-white shadow-md rounded-xl">
            <section className="flex flex-col items-end text-right text-sm w-full">
                <div className="relative w-4/5 h-full">
                    <Image
                        className="object-contain"
                        src={signupSrc}
                        alt="Login image"
                        fill
                    />
                </div>
                Copyright © 2023 TeS Inc. All rights reserved.
            </section>
            <section className="w-full flex flex-col gap-12 ">
                <h2 className="text-2xl text-center font-semibold">Đăng ký tài khoản</h2>
                <div className="flex flex-col gap-8 ">
                    <TextField
                        label="Tên đăng nhập"
                        value={username}
                        placeholder="Tên đăng nhập của bạn..."
                        onChange={(e) => setUsername(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <Icon className="mr-4" name="user" />
                            )
                        }}
                    />
                    <TextField
                        label="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mật khẩu của bạn..."
                        type={isShowPassword ? "text" : "password"}
                        InputProps={{
                            startAdornment: (
                                <Icon className="mr-4" name="key" />
                            ),
                            endAdornment: (
                                <button
                                    className="grid place-items-center w-12 h-10 rounded-full hover:bg-gray-50"
                                    onClick={() => setIsShowPassword(!isShowPassword)}
                                >
                                    <Icon name={isShowPassword ? "eye" : "eye-slash"} />
                                </button>
                            )
                        }}
                    />
                    <TextField
                        label="Xác nhận mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Xác nhận mật khẩu của bạn..."
                        type={isShowConfirmPassword ? "text" : "password"}
                        InputProps={{
                            startAdornment: (
                                <Icon className="mr-4" name="key" />
                            ),
                            endAdornment: (
                                <button
                                    className="grid place-items-center w-12 h-10 rounded-full hover:bg-gray-50"
                                    onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                                >
                                    <Icon name={isShowConfirmPassword ? "eye" : "eye-slash"} />
                                </button>
                            )
                        }}
                    />
                </div>
                <div className="flex flex-col gap-6 ">
                    <Button
                        size="large"
                        className="bg-primary"
                        variant="contained"
                    >
                        Đăng ký
                    </Button>

                    <p className="text-center">
                        Đã có tài khoản?
                        {" "}
                        <button
                            className="underline text-blue-400"
                            onClick={onPopupLogin}
                        >Đăng nhập ngay</button>
                    </p>
                </div>
            </section>
        </div>
    )
}