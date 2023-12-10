import IconButton from "@/components/IconButton";
import Sidebar from "@/layouts/Sidebar";
import { Chip } from "@mui/material";

export default function Page() {
   
    return (
        <div className="mt-4 mb-20">
            <div className="container flex gap-4">
                <Sidebar activeNav={2} />
                <main className="w-full flex flex-col gap-8 bg-white rounded-lg border">
                    
                </main>
            </div>
        </div>
    )
}