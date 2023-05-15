import React, { useState } from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import { Checkbox } from '@mui/material';

import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

interface Department {
    department: string;
    sub_departments: string[];
}

const departmentData: Department[] = [
    {
        department: 'customer_service',
        sub_departments: ['support', 'customer_success'],
    },
    {
        department: 'design',
        sub_departments: ['graphic_design', 'product_design', 'web_design'],
    },
];

const DepartmentList: React.FC = () => {
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

    const handleDepartmentSelect = (event: React.ChangeEvent<HTMLInputElement>, department: string, subDepartments: string[]) => {
        event.stopPropagation();

        const isDepartmentSelected = selectedDepartments.includes(department);
        let updatedSelectedDepartments = [...selectedDepartments];

        if (!isDepartmentSelected) {
            updatedSelectedDepartments.push(department);
            updatedSelectedDepartments.push(...subDepartments);
        } else {
            updatedSelectedDepartments = updatedSelectedDepartments.filter((dept) => ![department, ...subDepartments].includes(dept));
        }

        setSelectedDepartments(updatedSelectedDepartments);
    };

    const handleSubDepartmentSelect = (subDepartment: string, department: string, subDepartments: string[]) => {
        const isSubDepartmentSelected = selectedDepartments.includes(subDepartment);
        let updatedSelectedDepartments = [...selectedDepartments];

        if (!isSubDepartmentSelected) {
            updatedSelectedDepartments.push(subDepartment);

            const isAllSubDepartmentsSelected = subDepartments.every((subDept) => updatedSelectedDepartments.includes(subDept));
            const isDepartmentSelected = updatedSelectedDepartments.includes(department);
            if (isAllSubDepartmentsSelected && !isDepartmentSelected) {
                updatedSelectedDepartments.push(department);
            }
        } else {
            updatedSelectedDepartments = updatedSelectedDepartments.filter(
                (dept) => ![subDepartment, department].includes(dept)
            );
        }

        setSelectedDepartments(updatedSelectedDepartments);
    };

    const renderDepartment = (department: Department): React.ReactNode => {
        const isDepartmentSelected = selectedDepartments.includes(department.department);
        const selectedSubDepartments = department.sub_departments.filter((subDept) =>
            selectedDepartments.includes(subDept)
        );

        return (
            <TreeItem
                key={department.department}
                nodeId={department.department}
                label={
                    <div>
                        <Checkbox
                            checked={isDepartmentSelected && selectedSubDepartments.length === department.sub_departments.length}
                            indeterminate={!isDepartmentSelected && selectedSubDepartments.length > 0}
                            onChange={(event) =>
                                handleDepartmentSelect(event, department.department, department.sub_departments)
                            }
                            onClick={(event) => event.stopPropagation()}
                        />
                        {department.department}
                    </div>
                }
                onClick={(event) => event.stopPropagation()}
            >
                {department.sub_departments.map((subDept) => (
                    <TreeItem
                        key={subDept}
                        nodeId={subDept}
                        label={
                            <div>
                                <Checkbox
                                    checked={selectedDepartments.includes(subDept)}
                                    onChange={() => handleSubDepartmentSelect(subDept, department.department, department.sub_departments)}
                                    onClick={(event) => event.stopPropagation()}
                                />
                                {subDept}
                            </div>
                        }
                    />
                ))}</TreeItem>

        );
    };

    return (
        <TreeView defaultCollapseIcon={<ExpandLess />} defaultExpandIcon={<ExpandMore />}>
            {departmentData.map((department) => renderDepartment(department))}
        </TreeView>
    );
};

export default DepartmentList;
