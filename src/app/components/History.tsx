"use client";

const columns = [
  { field: "id", headerName: "Id", width: 30 },
  { field: "initialText", headerName: "Initial Text", flex: 1 },
  { field: "resultText", headerName: "Result Text", flex: 1 },
  { field: "date", headerName: "Date", width: 150 },
  { field: "price", headerName: "Price", width: 150 },
];

import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import ReactDiffViewer from "react-diff-viewer-continued";

export const History = ({ rows }: any) => {
  const [selectedRow, setSelectedRow] = useState<any>();
  console.log(selectedRow);

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        style={{ backgroundColor: "#fff" }}
        sx={{ maxHeight: "43vh" }}
        onRowClick={(row) => setSelectedRow(row)}
      />
      {selectedRow ? (
        <div style={{ maxHeight: "43vh" }}>
          <ReactDiffViewer
            oldValue={selectedRow.row.initialText}
            newValue={selectedRow.row.resultText}
            splitView={true}
            hideLineNumbers={true}
            leftTitle={"Initial text"}
            rightTitle={"Corrected text"}
          />
        </div>
      ) : (
        "Please select a row to view."
      )}
    </>
  );
};
