"use client";
import { getPersonalInfo } from "@/apis/candidate";
import PersonalInfoSection from "@/features/profile/view/PersonalInfoSection";
import ProfileSection from "@/features/profile/view/ProfileSection";
import useAlert from "@/hooks/useAlert";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import Sidebar from "@/layouts/Sidebar";
import ICandidate from "@/models/Candidate";
import { useEffect, useState } from "react";

export default function Page() {
    const setLoading = useLoadingAnimation();
    const setAlert = useAlert();

    const [candidate, setCandidate] = useState<ICandidate>();


    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setLoading(true);
        try {
            const { data: candidate } = await getPersonalInfo();
            setCandidate(candidate);
        }
        catch (ex) {
            setAlert({
                message: "Xảy ra lỗi khi nạp thông tin Ứng viên!",
                severity: "error"
            }); 
            console.log(ex);
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
                    <PersonalInfoSection
                        key={candidate?.candidateId}
                        candidate={candidate}
                    />
                    <ProfileSection
                        key={candidate?.candidateId}
                        candidate={candidate}
                    />
                </main>
            </div>
        </div>
    )
}