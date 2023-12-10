import Sidebar from "@/layouts/Sidebar";

export default function Page() {

    return (
        <div className="mt-4 mb-20">
            <div className="container flex gap-4">
                <Sidebar activeNav={4} />
                <main className="w-full flex flex-col gap-8 ">
                    
                </main>
            </div>
        </div>
    )
}