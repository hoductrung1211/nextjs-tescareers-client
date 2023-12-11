"use client";
import { getPersonalInfo, updateProfile } from "@/apis/candidate";
import { getAllExperiences } from "@/apis/masterDatas/experiences";
import { getAllQualifications } from "@/apis/masterDatas/qualifications";
import { getAllSkills } from "@/apis/masterDatas/skills";
import Field from "@/components/Field";
import { Textarea } from "@/components/Textarea";
import useAlert from "@/hooks/useAlert";
import useConfirm from "@/hooks/useConfirm";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import Sidebar from "@/layouts/Sidebar";
import IExperience from "@/models/Experience";
import IQualification from "@/models/Qualification";
import ISkill from "@/models/Skill";
import { ClassNames } from "@emotion/react";
import { Box, Button, Chip, FormControl, FormControlLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, TextField } from "@mui/material";
import { News_Cycle } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const confirm = useConfirm();
	const router = useRouter();
	const setAlert = useAlert();
	const setLoading = useLoadingAnimation();

	const [qualifications, setQualifications] = useState<IQualification[]>([])
	const [experiences, setExperiences] = useState<IExperience[]>([]);
	const [skills, setSkills] = useState<{
		skillId: number;
		skillName: string;
	}[]>([]);

	const [bio, setBio] = useState("");
	const [selectedQualification, setSelectedQualification] = useState("");
	const [selectedExperience, setSelectedExperience] = useState("");
	const [school, setSchool] = useState("");
	const [selectedSkills, setSelectedSkills] = useState<{
		skillId: number;
		skillName: string;
	}[]>([]);

	useEffect(() => {
		fetchData();
	}, []);

	async function fetchData() {
		setLoading(true);
		try {
			const { data: experinceRes } = await getAllExperiences();
			const { data: qualificationRes } = await getAllQualifications();
			const { data: skillRes } = await getAllSkills();

			setExperiences(experinceRes);
			setQualifications(qualificationRes);
			setSkills(skillRes.map(({skillId, skillName}) => ({
				skillId,
				skillName
			})));

			const { data: candidate } = await getPersonalInfo();
			setBio(candidate.bio ?? "");
			setSelectedExperience(candidate.experience.experienceId + "");
			setSelectedQualification(candidate.qualification.qualificationId + "");
			setSchool(candidate.school ?? "");
			setSelectedSkills(candidate.skills.map(({skillId, skillName}) => ({
				skillId,
				skillName
			})));
		}
		catch (ex) {

		}
		finally {
			setLoading(false);
		}
	}

	async function handleUpdateProfile() {
		setLoading(true);
		try {
			await updateProfile({
				bio,
				experienceId: Number.parseInt(selectedExperience),
				qualificationId: Number.parseInt(selectedQualification),
				school,
				skillIds: selectedSkills.map(skill => skill.skillId),
			});

			setAlert({
				message: "Cập nhật thông tin Ứng viên thành công!",
				severity: "success"
			});

			router.push("/profile")
		}
		catch (ex) {
			setAlert({
				message: "",
				severity: "error"
			});
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
					<section className=" p-6 pt-4 pb-10 flex flex-col gap-8 bg-white rounded-lg border">
						<div className="flex justify-between items-center">
							<h2 className="text-lg font-semibold text-primary">Thông tin cá nhân</h2>
						</div>

						<Field align="start" label="Giới thiệu bản thân">
							<FormControl fullWidth>
								<Textarea
									minRows={4}
									value={bio}
									onChange={e => setBio(e.target.value)}
								/>
							</FormControl>
						</Field>

						<Field align="start" label="Bằng cấp">
							<Select
								fullWidth
								labelId="qualification-label"
								id="qualification"
								value={selectedQualification}
								onChange={e => setSelectedQualification(e.target.value)}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{qualifications.map(q => (
									<MenuItem value={q.qualificationId}>{q.qualificationName}</MenuItem>
								))}
							</Select>
						</Field>

						<Field align="start" label="Kinh nghiệm">
							<RadioGroup
								className="pl-5"
								aria-labelledby="experience-label"
								name="experience-group"
								value={selectedExperience}
								onChange={e => setSelectedExperience(e.target.value)}
							>
								{experiences.map(e => (
									<FormControlLabel key={e.experienceId} value={e.experienceId} control={<Radio />} label={e.experienceName} />
								))}
							</RadioGroup>
						</Field>

						<Field align="start" label="Trường học">
							<TextField
								fullWidth
								value={school}
								onChange={e => setSchool(e.target.value)}
							/>
						</Field>

						<Field align="start" label="Kỹ năng">
							<MultipleSelectSkillsChip
								skills={skills}
								selectedSkills={selectedSkills}
								onChangeSelectedSkills={(e) => {
									let newSkills = e.target.value;
									if (typeof newSkills != "string") {
										if (newSkills.length > selectedSkills.length) {
											const lastSkill = newSkills[newSkills.length - 1];
											const idx = selectedSkills.findIndex(s => s.skillId == lastSkill.skillId);
											if (idx >= 0) {
												newSkills.splice(idx, 1);
												newSkills = newSkills.slice(0, newSkills.length - 1);
											}
										}

										setSelectedSkills(newSkills);
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
								confirm("Những thông tin bị thay đổi sẽ không được lưu lại?", () => {
									router.push("/profile");
								});
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
									handleUpdateProfile();
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


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
		},
	},
};

function MultipleSelectSkillsChip({
	skills,
	selectedSkills,
	onChangeSelectedSkills
}: {
	skills: { skillId: number; skillName: string; }[],
	selectedSkills: { skillId: number; skillName: string; }[],
	onChangeSelectedSkills: (event: SelectChangeEvent<{ skillId: number; skillName: string; }[]>) => void;
	}) {
	
	console.log(selectedSkills);
	return (
		<FormControl fullWidth>
			<Select
				labelId="skill-chip-label"
				id="skill-chip"
				multiple
				value={selectedSkills}
				onChange={onChangeSelectedSkills}
				input={<OutlinedInput id="select-skill-chip" />}
				renderValue={(selected) => (
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
						{selected.map((skill) => (
							<Chip key={skill.skillId} label={skill.skillName} />
						))}
					</Box>
				)}
				MenuProps={MenuProps}
			>
				{skills.map((skill) => (
					<MenuItem // TODO: Change this from ISkill type into string (skill ID)
						key={skill.skillId}
						value={skill}
					>
						{skill.skillName}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}