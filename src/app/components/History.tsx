"use client";

const columns = [
  { field: "id", headerName: "Id", width: 30 },
  { field: "initialText", headerName: "Initial Text", flex: 1 },
  { field: "resultText", headerName: "Result Text", flex: 1 },
  { field: "date", headerName: "Date", width: 150 },
  { field: "price", headerName: "Price", width: 150 },
];

import { DataGrid } from "@mui/x-data-grid";

export const History = ({ rows }: any) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      style={{ backgroundColor: "#fff" }}
    />
  );
};
