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
  const [expanded, setExpanded] = useState<string[]>([]);

  const handleToggle = (value: string, isDepartment: boolean = false) => {
    let newChecked = [...checked];
    let newExpanded = [...expanded];

    if (isDepartment) {
      const department = departmentData.find(d => d.department === value);
      if (department) {
        if (newChecked.includes(value)) {
          newChecked = newChecked.filter(v => v !== value && !department.sub_departments.includes(v));
          newExpanded = newExpanded.filter(v => v !== value);
        } else {
          newChecked.push(value, ...department.sub_departments);
          newExpanded.push(value);
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
    setExpanded(newExpanded);
  };

  useEffect(() => {
    departmentData.forEach(department => {
      if (department.sub_departments.every(subDept => checked.includes(subDept))) {
        if (!checked.includes(department.department)) {
          setChecked(prevChecked => [...prevChecked, department.department]);
          setExpanded(prevExpanded => [...prevExpanded, department.department]);
        }
      } else {
        if (checked.includes(department.department)) {
          setChecked(prevChecked => prevChecked.filter(check => check !== department.department));
          setExpanded(prevExpanded => prevExpanded.filter(expand => expand !== department.department));
        }
      }
    });
  }, [checked]);

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      onNodeToggle={(_, nodeIds) => setExpanded(nodeIds)}
    >
      {departmentData.map((department) => (
        <TreeItem
          key={department.department}
          nodeId={department.department}
          label={
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
          }
        >
          {department.sub_departments.map((subDepartment) => (
            <TreeItem
              key={subDepartment}
              nodeId={`${department.department}-${subDepartment}`}
              label={
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
              }
            />
          ))}
        </TreeItem>
      ))}
    </TreeView>
  );
};

export { DepartmentList };
