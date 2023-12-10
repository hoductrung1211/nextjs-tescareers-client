"use client";
import Icon from "@/components/Icon";
import IconButton from "@/components/IconButton";
import useAlert from "@/hooks/useAlert";
import IJobPosting from "@/models/JobPosting";
import { durationFromNow } from "@/utils/functions/getDuration";
import { getVNLocaleDateString } from "@/utils/functions/getLocaleDateString";
import { Chip, } from "@mui/material";
import { useState } from "react"

interface IJobPostingListSectionProps {
	jobPostings: IJobPosting[];
	onClickJobPosting: (jp: IJobPosting) => void;
}

export default function JobPostingListSection({
	jobPostings,
	onClickJobPosting,
}: IJobPostingListSectionProps) {
	const setAlert = useAlert();

	return (
		<aside className="pb-4 col-span-3 flex flex-col gap-4">
			{jobPostings.map(job => (
				<div
					key={job.jobPostingId}
					className="flex flex-col gap-1 p-4 border rounded-lg bg-white"
				>
					<div className="flex justify-between items-center ">
						<h3
							className="uppercase font-semibold text-primary cursor-pointer"
							onClick={() => onClickJobPosting(job)}
						>
							{job.jobPostingTitle}
						</h3>
						<IconButton
							name="bookmark"
							tooltip="Lưu công việc"
							onClick={e => {
								setAlert({
									message: "Lưu công việc thành công!",
									severity: "success"
								})
							}} />
					</div>
					<div className="flex gap-4 items-center">
						<Chip label={(job.jobDescription.minSalary).toLocaleString() + " VND"} />
						-
						<Chip label={(job.jobDescription.maxSalary).toLocaleString() + " VND"} />
					</div>
					<div className="mt-4">
						{job.responsibilities}
					</div>
					<div className="mt-4 flex flex-col gap-4 text-apple-gray text-sm">
						<div className="flex justify-between">
							<p className="flex gap-2 items-center">
								<Icon name="clock" size="lg" />
								Hạn ứng tuyển còn {durationFromNow(job.deadline)} ngày
							</p>
						</div>
						<div className="flex gap-2 flex-wrap">
							{job.jobDescription.skills.map(skill => <Chip key={skill.skillId} label={skill.skillName} />)}
							<p className="ml-auto flex gap-2 items-center">
								{/* <Icon name="clock" size="lg" /> */}
								Tạo từ {getVNLocaleDateString(job.createdDateTime)}
							</p>
						</div>

					</div>
				</div>
			))}
		</aside>
	)
}