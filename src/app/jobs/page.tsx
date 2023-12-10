"use client";
import { getJobPostings } from "@/apis/jobPosting";
import Icon from "@/components/Icon";
import IconButton from "@/components/IconButton";
import JobPostingDetail from "@/features/jobs/JobPostingDetail";
import JobPostingListSection from "@/features/jobs/JobPostingListSection";
import { IFilter } from "@/features/jobs/filter/FilterBarSection";
import FilterLayout from "@/features/jobs/filter/FilterLayout";
import useAlert from "@/hooks/useAlert";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import IJobPosting from "@/models/JobPosting";
import { useEffect, useState } from "react";

export default function Page() {
    const setLoading = useLoadingAnimation();
    const setAlert = useAlert();

    const [jobPostings, setJobPostings] = useState<IJobPosting[]>([]);
    const [filteredJobPostings, setFilteredJobPostings] = useState<IJobPosting[]>([]);
    const [selectedJobPosting, setSelectedJobPosting] = useState<IJobPosting>();

    useEffect(() => {
        fetchJobPostings();
    }, []);

    async function fetchJobPostings() {
        setLoading(true);
        try {
            const { data: jobPostingListRes } = await getJobPostings();
            setJobPostings(jobPostingListRes);
            setFilteredJobPostings(jobPostingListRes);

            if (jobPostingListRes.length) {
                setSelectedJobPosting(jobPostingListRes[0]);
            }
        }
        catch (ex) {
            setAlert({
                message: "Xảy ra lỗi khi nạp dữ liệu danh sách Bài đăng tuyển dụng!",
                severity: "error"
            })
        }
        finally {
            setLoading(false);
        }
    }

    function handleFilterJobPostings(filter: IFilter) {
        const {
            contractTypeId,
            employeeRoleTypeId,
            postTimeId,
            salaryRangeId,
            workSiteId,
        } = filter;

        let newPostings = jobPostings;

        if (contractTypeId) {
            newPostings = newPostings.filter(posting =>
                posting.jobDescription.contractType.contractTypeId + "" == contractTypeId);
        }

        if (employeeRoleTypeId) {
            newPostings = newPostings.filter(posting =>
                posting.jobDescription.employeeRoleType.employeeRoleTypeId + "" == employeeRoleTypeId);
        }
        
        if (workSiteId) {
            newPostings = newPostings.filter(posting =>
                posting.jobDescription.workSite.workSiteId + "" == workSiteId);
        }

        if (postTimeId) {

        }

        if (salaryRangeId) {

        }

        setFilteredJobPostings(newPostings);
    }

    return (
        <main className="flex flex-col gap-4">
            <FilterLayout
                onFilter={handleFilterJobPostings}
            />
            <section className="container grid grid-cols-7 gap-4">
                {
                    filteredJobPostings.length ?
                        <>
                            <JobPostingListSection
                                jobPostings={filteredJobPostings}
                                onClickJobPosting={setSelectedJobPosting}
                            />
                            <JobPostingDetail
                                key={selectedJobPosting?.jobPostingId}
                                jobPosting={selectedJobPosting}
                            />
                        </> :
                        <div className="col-span-7 h-96 grid place-items-center">
                            <p className="flex items-center gap-4 text-gray-500">
                                <Icon name="folder-open" size="xl"/>
                                Danh sách bài đăng tuyển trống
                            </p>
                        </div>
                }
            </section>

            <div className="fixed bottom-10 right-6">
                <IconButton
                    className="bg-white border-2"
                    name="angles-up"
                    onClick={() => {
                        window.scrollTo(0, 0);
                    }}
                />
            </div>
        </main>
    )
}