'use client';
import { AlertProvider } from "@/hooks/useAlert"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { ModalProvider } from "@/hooks/useModal";
import { LoadingAnimationProvider } from "@/hooks/useLoadingAnimation";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/configs/theme";


export default function Provider({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                <AlertProvider>
                    <ModalProvider>
                        <LoadingAnimationProvider>
                            {children}
                        </LoadingAnimationProvider>
                    </ModalProvider>
                </AlertProvider>
            </LocalizationProvider>
        </ThemeProvider>
    )
}