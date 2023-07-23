import React, { useEffect, useState } from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import { Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const departmentData = [
  {
    "department": "customer_service",
    "sub_departments": [
      "support",
      "customer_success"
    ]
  },
  {
    "department": "design",
    "sub_departments": [
      "graphic_design",
      "product_design",
      "web_design"
    ]
  }
];

const DepartmentList: React.FC = () => {
  const [checked, setChecked] = useState<string[]>([]);

  const handleToggle = (value: string, isDepartment: boolean = false) => {
    let newChecked = [...checked];

    if (isDepartment) {
      const department = departmentData.find(d => d.department === value);
      if (department) {
        if (newChecked.includes(value)) {
          newChecked = newChecked.filter(v => v !== value && !department.sub_departments.includes(v));
        } else {
          newChecked.push(value, ...department.sub_departments);
        }
      }
    } else {
      const currentIndex = newChecked.indexOf(value);
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    departmentData.forEach(department => {
      if (department.sub_departments.every(subDept => checked.includes(subDept))) {
        if (!checked.includes(department.department)) {
          setChecked(prevChecked => [...prevChecked, department.department]);
        }
      } else {
        if (checked.includes(department.department)) {
          setChecked(prevChecked => prevChecked.filter(check => check !== department.department));
        }
      }
    });
  }, [checked]);

  return (
    // <div className="department-list">
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {departmentData.map((department, index) => (
        <TreeItem nodeId={index.toString()} label={
          <div>
            <Checkbox
              edge="start"
              checked={checked.includes(department.department)}
              tabIndex={-1}
              disableRipple
              onChange={() => handleToggle(department.department, true)}
            />
            {department.department}
          </div>
        }>
          {department.sub_departments.map((subDepartment, subIndex) => (
            <TreeItem nodeId={`${index}${subIndex}`} label={
              <div>
                <Checkbox
                  edge="start"
                  checked={checked.includes(subDepartment)}
                  tabIndex={-1}
                  disableRipple
                  onChange={() => handleToggle(subDepartment)}
                />
                {subDepartment}
              </div>
            } />
          ))}
        </TreeItem>
      ))}
    </TreeView>
    // </div>
  );
};

export { DepartmentList };



