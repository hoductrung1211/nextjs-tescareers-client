"use client";
import Field from "@/components/Field";
import IconButton from "@/components/IconButton";
import { Textarea } from "@/components/Textarea";
import useAlert from "@/hooks/useAlert";
import useConfirm from "@/hooks/useConfirm";
import Sidebar from "@/layouts/Sidebar";
import ISkill from "@/models/Skill";
import { Box, Button, Chip, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const confirm = useConfirm();
    const router = useRouter();
    const alert = useAlert();

    const [school, setSchool] = useState("Học viện công nghệ bưu chính viễn thông");
    const [experiences, setExperiences] = useState([{
        experienceId: 1,
        experienceName: "aaa"
    }]);

    const [qualifications, setQualifications] = useState([
        {
            qualificationId: 1,
            qualificationName: "aaaa"
        }
    ])

    return (
        <div className="mt-4 mb-20">
            <div className="container flex gap-4">
                <Sidebar />
                <main className="w-full flex flex-col gap-8 ">
                    <section className=" p-6 pt-4 pb-10 flex flex-col gap-4 bg-white rounded-lg border">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-primary">Thông tin cá nhân</h2>
                        </div>

                        <Field align="start" label="Giới thiệu bản thân">
                            <FormControl fullWidth>
                                <Textarea
                                    minRows={4}
                                />
                            </FormControl>
                        </Field>

                        <Field label="Bằng cấp">
                            <Select
                                fullWidth
                                labelId="qualification-label"
                                id="qualification"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {qualifications.map(q => (
                                    <MenuItem value={q.qualificationId}>{q.qualificationName}</MenuItem>
                                ))}
                            </Select>
                        </Field>

                        <Field label="Kinh nghiệm">
                            <RadioGroup
                                className="pl-5"
                                aria-labelledby="experience-label"
                                name="experience-group"
                            >
                                {experiences.map(e => (
                                    <FormControlLabel key={e.experienceId} value={e.experienceId} control={<Radio />} label={e.experienceName} />
                                ))}
                            </RadioGroup>
                        </Field>

                        <Field label="Trường học">
                            <TextField
                                fullWidth
                                value={school}
                                onChange={e => setSchool(e.target.value)}
                            />
                        </Field>

                        <Field label="Kỹ năng">
                            <MultipleSelectSkillsChip
                                skills={[]}
                                
                            />
                        </Field>
                    </section>
                    <section className="flex items-center justify-end gap-6">
                        <Button
                            size="large"
                            variant="outlined"
                            className="font-semibold"
                            onClick={() => {

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
                                    alert({
                                        message: "Cập nhật thông tin cá nhân thành công!",
                                        severity: "success"
                                    });

                                    router.push("./");
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
    skills: ISkill[],
    selectedSkills: ISkill[],
    onChangeSelectedSkills: (event: SelectChangeEvent<ISkill[]>) => void;
}) {
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