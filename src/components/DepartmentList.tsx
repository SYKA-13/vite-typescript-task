import React, { useState } from 'react';
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
      const parentDepartment = departmentData.find(d => d.sub_departments.includes(value));

      if (currentIndex === -1) {
        newChecked.push(value);
        if (parentDepartment && !newChecked.includes(parentDepartment.department)) {
          newChecked.push(parentDepartment.department);
        }
      } else {
        newChecked.splice(currentIndex, 1);
        if (parentDepartment && newChecked.includes(parentDepartment.department) && parentDepartment.sub_departments.some(d => newChecked.includes(d))) {
          newChecked = newChecked.filter(v => v !== parentDepartment.department);
        }
      }
    }

    setChecked(newChecked);
  };

  const handleExpand = (_: any, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      onNodeToggle={handleExpand}
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
                onClick={(event) => event.stopPropagation()}
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
                    onClick={(event) => event.stopPropagation()}
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
