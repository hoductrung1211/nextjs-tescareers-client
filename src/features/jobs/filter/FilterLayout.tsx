"use client";
import Icon from "@/components/Icon";
import { Button, TextField } from "@mui/material";
import FilterBarSection, { IFilter } from "./FilterBarSection";
import { useState } from "react";
import IJobPosting from "@/models/JobPosting";

interface IFilterLayoutProps {
    onFilter: (filter: IFilter) => void;
}

export default function FilterLayout({
    onFilter
}: IFilterLayoutProps) {
    const [filters, setFilters] = useState<IFilter>({
        contractTypeId: "",
        employeeRoleTypeId: "",
        postTimeId: "",
        salaryRangeId: "",
        workSiteId: ""
    });

    return (
        <section className="h-96 flex items-center bg-[#0fb9b1]">
            <div className="container flex flex-col gap-4">
                <h1 className="text-4xl font-bold text-white ">Tìm việc làm tại TeS Careers</h1>
                
                <section className="flex gap-6 p-3 rounded-lg bg-opacity-60 bg-white backdrop-blur-lg">
                    <div className="w-full bg-white rounded-md">
                        <TextField
                            placeholder="Từ khóa, chức danh, hoặc kỹ năng"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <Icon
                                        className="ml-2 mr-6 text-primary"
                                        name="magnifying-glass"
                                        size="xl"
                                    />
                                ),
                            }}
                        />
                    </div>
                    <Button
                        className="w-68 text-lg font-bold bg-primary"
                        variant="contained"
                        onClick={() => onFilter(filters)}
                    >
                        Tìm việc
                    </Button>
                </section>
                
                <FilterBarSection
                    filters={filters}
                    onChangeFilters={setFilters}
                />
            </div>
        </section>
    )
}