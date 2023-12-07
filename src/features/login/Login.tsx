"use client";
import { login } from "@/apis/auth/auth";
import loginSrc from "@/assets/login_01.png";
import Icon from "@/components/Icon";
import useAlert from "@/hooks/useAlert";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";

import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function Login({
    onSwitchToSignup,
    onLoginSuccessfully,
}: {
    onSwitchToSignup?: () => void;
    onLoginSuccessfully?: () => void;  
}) {
    const setLoading = useLoadingAnimation();
    const setAlert = useAlert();

    const [username, setUsername] = useState("ngoxuanthuong");
    const [password, setPassword] = useState("Password@123");
    const [isRemembered, setIsRemembered] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);

    async function handleLogin() {
        setLoading(true);
        try {
            const { data: {
                accessToken,
                refreshToken,
                fullName,
                role,
            }} = await login({
                username,
                password
            });

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('fullName', fullName);
            localStorage.setItem('role', role);

            setAlert({
                message: "Đăng nhập thành công",
                severity: "success"
            });

            onLoginSuccessfully?.();
        }
        catch(ex) {
            setAlert({
                message: "Đăng nhập thất bại! Làm ơn thử lại.",
                severity: "error"
            });
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-[880px] flex gap-20 px-10 py-8 border border-concrete bg-foreground shadow-md rounded-xl">
            <section className="flex flex-col items-end text-right text-sm w-full ">
                <div className="relative w-4/5 h-full">
                    <Image
                        className="object-contain"
                        src={loginSrc}
                        alt="Login image"
                        fill
                    />
                </div>
                Copyright © 2023 TeS Inc. All rights reserved.
            </section>
            <section className="w-full flex flex-col gap-12 ">
                <h2 className="text-2xl text-center font-semibold">Đăng nhập</h2>
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
                    <div className="flex items-center justify-between">
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox onChange={e => setIsRemembered(e.target.checked)} />}
                                checked={isRemembered}
                                label="Nhớ mật khẩu"
                            />
                        </FormGroup>

                        <button className="underline text-blue-400">Quên mật khẩu</button>
                    </div>
                </div>
                <div className="flex flex-col gap-6 ">
                    <Button
                        size="large"
                        className="bg-primary"
                        onClick={handleLogin}
                        variant="contained"
                    >
                        Đăng nhập
                    </Button>

                    <p className="text-center">
                        Chưa có tài khoản?
                        {" "}
                        <button
                            className="underline text-blue-400"
                            onClick={onSwitchToSignup}
                        >Đăng ký ngay</button>
                    </p>
                </div>
            </section>
        </div>
    )
}