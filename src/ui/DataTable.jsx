import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { useState } from "react";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

export default function DataTable() {
  const [selectionBehavior, setSelectionBehavior] = useState("toggle");

  return (
    <div className="flex flex-col gap-3 h-screen p-8 w-full max-w-screen-lg mx-auto">
      <Table
        aria-label="Selection behavior table example with dynamic content"
        selectionMode="multiple"
        selectionBehavior={selectionBehavior}
        className="table-auto w-full border border-gray-300 rounded-lg shadow-md"
      >
        <TableHeader
          columns={columns}
          className="px-4 py-2 text-left font-medium text-gray-700"
        >
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key} className="hover:bg-gray-100">
              {(columnKey) => (
                <TableCell className="px-4 py-2 border-t">
                  {getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <RadioGroup
        label="Selection Behavior"
        orientation="horizontal"
        value={selectionBehavior}
        onValueChange={setSelectionBehavior}
      >
        <Radio value="toggle">Toggle</Radio>
        <Radio value="replace">Replace</Radio>
      </RadioGroup>
    </div>
  );
}
