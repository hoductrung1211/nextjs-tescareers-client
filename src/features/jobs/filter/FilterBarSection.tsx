"use client";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Icon from "@/components/Icon";
import { useEffect, useState } from "react";
import { getAllEmployeeRoleTypes } from "@/apis/masterDatas/employeeRoleTypes";
import { getAllWorkSites } from "@/apis/masterDatas/workSite";
import { getAllContractTypes } from "@/apis/masterDatas/contractTypes";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import useAlert from "@/hooks/useAlert";
import IContractType from "@/models/ContractType";
import IWorkSite from "@/models/WorkSite";
import IEmployeeRoleType from "@/models/EmployeeRoleType";

export interface IFilter {
    postTimeId: string,
    employeeRoleTypeId: string;
    workSiteId: string;
    contractTypeId: string;
    salaryRangeId: string;
}

interface IFilterBarSectionProps {
    filters: IFilter;
    onChangeFilters: (newFilter: IFilter) => void;
}

export default function FilterBarSection({
    filters,
    onChangeFilters,
}: IFilterBarSectionProps) {
    const setLoading = useLoadingAnimation();
    const setAlert = useAlert();

    const postTimes = [
        {
            postTimeId: 1,
            postTimeText: "Trong 3 ngày",
        },
        {
            postTimeId: 2,
            postTimeText: "Trong 1 tuần",
        },
        {
            postTimeId: 3,
            postTimeText: "Trong 1 tháng",
        },
    ];
    const [employeeRoleTypes, setEmployeeRoleTypes] = useState<IEmployeeRoleType[]>([]);
    const [workSites, setWorkSites] = useState<IWorkSite[]>([]);
    const [contractTypes, setContractTypes] = useState<IContractType[]>([]);
    const salaryRanges = [
        {
            salaryRangeId: 1,
            salaryRangeText: "3 - 5 triệu VND",
        },
        {
            salaryRangeId: 2,
            salaryRangeText: "5 - 10 triệu VND",
        },
        {
            salaryRangeId: 3,
            salaryRangeText: "10 - 15 triệu VND",
        },
        {
            salaryRangeId: 4,
            salaryRangeText: "15 - 20 triệu VND",
        },
        {
            salaryRangeId: 5,
            salaryRangeText: "20 - 25 triệu VND",
        },
        {
            salaryRangeId: 6,
            salaryRangeText: "25 - 30 triệu VND",
        },
        {
            salaryRangeId: 7,
            salaryRangeText: "Trên 30 triệu VND",
        },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setLoading(true);
        try {
            const { data: employeeRoleTypeRes } = await getAllEmployeeRoleTypes();
            const { data: workSiteRes } = await getAllWorkSites();
            const { data: contractTypeRes } = await getAllContractTypes();

            setEmployeeRoleTypes(employeeRoleTypeRes);
            setWorkSites(workSiteRes);
            setContractTypes(contractTypeRes);
        }
        catch (ex) {
            setAlert({
                message: "Xảy ra lỗi trong khi nạp dữ liệu khởi tạo của bộ lọc dữ liệu!",
                severity: "error",
            });
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <section className="p-5 pt-3 bg-content rounded-md">
            <h2 className="font-semibold flex items-center gap-3">
                <Icon name="filter" />
                Lọc công việc
            </h2>

            <div className="mt-5 grid grid-cols-5 gap-3">
                <FormControl size="small">
                    <InputLabel>Bài đăng mới</InputLabel>
                    <Select
                        size="small"
                        className="bg-white  text-dark"
                        label="Bài đăng mới"
                        value={filters.postTimeId}
                        onChange={e => onChangeFilters({
                            ...filters,
                            postTimeId: e.target.value
                        })}
                    >
                        <MenuItem value="">
                            <em>Tất cả</em>
                        </MenuItem>
                        {postTimes.map(postTime => (
                            <MenuItem key={postTime.postTimeId} value={postTime.postTimeId + ""}>
                                {postTime.postTimeText}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small">
                    <InputLabel>Vị trí nhân viên</InputLabel>
                    <Select
                        size="small"
                        className="bg-white  text-dark"
                        label="Vị trí nhân viên"
                        value={filters.employeeRoleTypeId}
                        onChange={e => onChangeFilters({
                            ...filters,
                            employeeRoleTypeId: e.target.value,
                        })}
                    >
                        <MenuItem value="">
                            <em>Tất cả</em>
                        </MenuItem>
                        {employeeRoleTypes.map(role => (
                            <MenuItem key={role.employeeRoleTypeId} value={role.employeeRoleTypeId + ""}>
                                {role.employeeRoleTypeName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small">
                    <InputLabel>Nơi làm việc</InputLabel>
                    <Select
                        size="small"
                        className="bg-white  text-dark"
                        label="Nơi làm việc"
                        value={filters.workSiteId}
                        onChange={e => onChangeFilters({
                            ...filters,
                            workSiteId: e.target.value,
                        })}
                    >
                        <MenuItem value="">
                            <em>Tất cả</em>
                        </MenuItem>
                        {workSites.map(workSite => (
                            <MenuItem key={workSite.workSiteId} value={workSite.workSiteId + ""}>
                                {workSite.workSiteName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small">
                    <InputLabel>Kiểu hợp đồng</InputLabel>
                    <Select
                        size="small"
                        className="bg-white  text-dark"
                        label="Kiểu hợp đồng"
                        value={filters.contractTypeId}
                        onChange={e => onChangeFilters({
                            ...filters,
                            contractTypeId: e.target.value
                        })}
                    >
                        <MenuItem value="">
                            <em>Tất cả</em>
                        </MenuItem>
                        {contractTypes.map(contractType => (
                            <MenuItem key={contractType.contractTypeId} value={contractType.contractTypeId + ""}>
                                {contractType.contractTypeName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small">
                    <InputLabel>Khung lương</InputLabel>
                    <Select
                        size="small"
                        className="bg-white  text-dark"
                        label="Vị trí nhân viên"
                        value={filters.salaryRangeId}
                        onChange={e => onChangeFilters({
                            ...filters,
                            salaryRangeId: e.target.value
                        })}
                    >
                        <MenuItem value="">
                            <em>Tất cả</em>
                        </MenuItem>
                        {salaryRanges.map(salaryRange => (
                            <MenuItem key={salaryRange.salaryRangeId} value={salaryRange.salaryRangeId + ""}>
                                {salaryRange.salaryRangeText}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </section>
    )
}