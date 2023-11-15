"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

const renderBoolean = (params: any) =>
  params.value ? (
    <FontAwesomeIcon icon={faCheck} />
  ) : (
    <FontAwesomeIcon icon={faX} />
  );

const columns = [
  { field: "id", headerName: "Id", width: 30 },
  { field: "initialText", headerName: "Initial Text", flex: 1 },
  {
    field: "isGrammar",
    renderCell: renderBoolean,
    headerName: "Grammar",
    width: 100,
  },
  {
    field: "isVocab",
    renderCell: renderBoolean,
    headerName: "Vocab",
    width: 100,
  },
  {
    field: "isPunct",
    renderCell: renderBoolean,
    headerName: "Punctuation",
    width: 100,
  },
  {
    field: "isWordChoice",
    renderCell: renderBoolean,
    headerName: "Word Choice",
    width: 100,
  },
  {
    field: "isPlagiarismL",
    renderCell: renderBoolean,
    headerName: "Plagiarism",
    width: 100,
  },
  {
    field: "isGPT4",
    renderCell: renderBoolean,
    headerName: "GPT4",
    width: 100,
  },
  { field: "date", headerName: "Date", width: 150 },
  { field: "price", headerName: "Price", width: 150 },
];

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import ReactDiffViewer from "react-diff-viewer-continued";

export const History = ({ rows }: any) => {
  const [selectedRow, setSelectedRow] = useState<any>();
  const [comparisonMode, setComparisonMode] = useState("diffChars");

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        style={{ backgroundColor: "#fff" }}
        sx={{ maxHeight: "43vh" }}
        onRowClick={(row) => setSelectedRow(row)}
      />

      <br />
      <hr />
      <br />
      {selectedRow ? (
        <div style={{ maxHeight: "43vh" }}>
          <FormControl>
            <FormLabel>Choose comparison mode:</FormLabel>
            <RadioGroup
              row
              value={comparisonMode}
              onChange={(e) => setComparisonMode(e.target.value)}
            >
              <FormControlLabel
                value="diffChars"
                control={<Radio />}
                label="Character"
              />
              <FormControlLabel
                value="diffWords"
                control={<Radio />}
                label="Word"
              />
              <FormControlLabel
                value="diffWordsWithSpace"
                control={<Radio />}
                label="Word with space"
              />
              <FormControlLabel
                value="diffLines"
                control={<Radio />}
                label="Lines"
              />
              <FormControlLabel
                value="diffTrimmedLines"
                control={<Radio />}
                label="Trimmed Lines"
              />{" "}
              <FormControlLabel
                value="diffSentences"
                control={<Radio />}
                label="Sentences"
              />
            </RadioGroup>
          </FormControl>
          <ReactDiffViewer
            oldValue={selectedRow.row.initialText}
            newValue={selectedRow.row.resultText}
            splitView={true}
            hideLineNumbers={true}
            leftTitle={"Initial text"}
            rightTitle={"Corrected text"}
            //@ts-ignore
            compareMethod={comparisonMode}
          />
        </div>
      ) : (
        "Please select a row to view."
      )}
    </>
  );
};
