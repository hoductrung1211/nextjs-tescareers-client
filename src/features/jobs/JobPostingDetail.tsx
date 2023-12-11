"use client";
import Icon from "@/components/Icon";
import useAlert from "@/hooks/useAlert";
import useModal from "@/hooks/useModal";
import IJobPosting from "@/models/JobPosting";
import { isLoggedIn } from "@/utils/functions/checkLoggedIn";
import { durationFromNow } from "@/utils/functions/getDuration";
import { Button, Chip, } from "@mui/material";
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { applyJob } from "@/apis/applicationSubmission";

interface IJobPostingDetailProps {
    jobPosting?: IJobPosting;
}

interface IJobPostingField {
    icon: string;
    title: string;
    value: string | {
        id: number;
        name: string;
    }[]
}

export default function JobPostingDetail({
    jobPosting
}: IJobPostingDetailProps) {
    const setAlert = useAlert();

    const [fields, setFields] = useState<IJobPostingField[]>([]);

    useEffect(() => {
        setFields([
            {
                icon: "user-tie",
                title: "Vai trò",
                value: jobPosting?.jobDescription.employeeRoleType.employeeRoleTypeName ?? "",
            },
            {
                icon: "money-bill",
                title: "Khung lương",
                value: jobPosting?.jobDescription.minSalary.toLocaleString() + " VND - " + jobPosting?.jobDescription.maxSalary.toLocaleString() + " VND",
            },
            {
                icon: "briefcase",
                title: "Loại hợp đồng",
                value: jobPosting?.jobDescription.contractType.contractTypeName ?? "",
            },
            {
                icon: "building-user",
                title: "Nơi làm việc",
                value: jobPosting?.jobDescription.workSite.workSiteName ?? "",
            },
            {
                icon: "user-graduate",
                title: "Yêu cầu bằng cấp",
                value: jobPosting?.jobDescription.qualification.qualificationName ?? "",
            },
            {
                icon: "chart-simple",
                title: "Kinh nghiệm",
                value: jobPosting?.jobDescription.experience.experienceName ?? "",
            },
            {
                icon: "award",
                title: "Yêu cầu kỹ năng",
                value: jobPosting?.jobDescription.skills.map(skill => ({
                    id: skill.skillId,
                    name: skill.skillName
                })) ?? [],
            },
            {
                icon: "clock",
                title: "Hạn nộp",
                value: `Còn ${durationFromNow(jobPosting?.deadline ?? "")} ngày`,
            },
        ])
    }, []);

    
    return (
        <main className="col-span-4 h-[660px]  flex flex-col border sticky top-20 rounded-lg bg-white">
            <section className="flex-shrink-0 h-40 p-4 flex flex-col gap-4 border-b">
                <h1 className="uppercase font-semibold text-lg">
                    {jobPosting?.jobPostingTitle}
                </h1>
                <p className="flex gap-2 items-center text-apple-gray">
                    <Icon name="location-dot" />
                    Hồ Chí Minh
                </p>
                <div className="flex items-center gap-4">
                    <Button
                        className="bg-primary font-semibold"
                        variant="contained"
                        onClick={async () => {
                            if (!isLoggedIn()) {
                                setAlert({
                                    message: "Bạn phải đăng nhập trước!",
                                    severity: "error"
                                })
                            }

                            else if (jobPosting) {
                                try {
                                    await applyJob(jobPosting?.recruitmentId);
                                    
                                    setAlert({
                                        message: "Ứng tuyển thành công!",
                                        severity: "success"
                                    });
                                }
                                catch (ex) {
                                    if (isAxiosError(ex)) {
                                        setAlert({
                                            message: ex.message,
                                            severity: "error"
                                        });
                                    }
                                    console.log(ex);
                                }
                            }
                        }}
                    >
                        <Icon className="mr-2" name="paper-plane" />
                        Ứng tuyển
                    </Button>
                    <Button
                        className="font-semibold"
                        variant="outlined"
                        onClick={() => {
                            setAlert({
                                message: "Lưu công việc thành công!",
                                severity: "success"
                            })
                        }}
                    >
                        <Icon className="mr-2" name="bookmark" />
                        Lưu công việc
                    </Button>

                </div>
            </section>
            <section className="flex-grow pb-10  flex flex-col gap-4 overflow-auto">
                <div className="flex-shrink-0 flex flex-col p-4 bg-slate-50">
                    {
                        fields.map(field => (
                            <div key={field.title} className="mb-4 min-w-[50%] flex items-start">
                                <section className="flex-shrink-0 w-52 flex items-center gap-2">
                                    <div className="h-10 w-10 rounded-full grid place-items-center bg-gray-200">
                                        <Icon name={field.icon} />
                                    </div>
                                    <h6 className="font-semibold">{field.title}:</h6>
                                </section>
                                {
                                    typeof field.value == "string" ?
                                        <p className="mt-2">{field.value}</p> :
                                        <div className="flex flex-wrap items-center gap-2">
                                            {
                                                field.value.map(skill => (
                                                    <Chip key={skill.id} label={skill.name} />
                                                ))
                                            }
                                        </div>
                                }
                            </div>
                        ))
                    }

                </div>
                <div className="flex-shrink-0 py-3 px-5 h-fit flex flex-col gap-10">
                    <section className="flex flex-col gap-2">
                        <h3 className="font-semibold text-lg">Mô tả công việc</h3>
                        <article className="">
                            {jobPosting?.responsibilities}
                        </article>
                    </section>
                    <section className="flex flex-col gap-2">
                        <h3 className="font-semibold text-lg">Thông tin liên hệ</h3>
                        <p className="flex gap-4">
                            <span className="w-40 text-end font-semibold">
                                HR
                            </span>
                            {jobPosting?.publisherName}
                        </p>
                        <p className="flex gap-4">
                            <span className="w-40 text-end font-semibold">
                                Email
                            </span>
                            hoductrung2604@gmail.com
                        </p>
                    </section>
                </div>
            </section>
        </main>
    )
}