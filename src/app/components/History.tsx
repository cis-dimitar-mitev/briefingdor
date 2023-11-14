"use client";

import { useState } from "react";
import styles from '../page.module.css';

const columns = [
    { field: "id", headerName: "Id", width: 30 },
    { field: "initialText", headerName: "Initial Text", flex: 1 },
    { field: "resultText", headerName: "Result Text", flex: 1 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
];

import { DataGrid } from "@mui/x-data-grid";

export const History = ({ rows }: any) => {
    const [selection, setSelection] = useState<any>(null);

    return (
        <>
            <DataGrid
                rows={rows}
                columns={columns}
                style={{ backgroundColor: "#fff", maxHeight: '500px' }}
                onRowSelectionModelChange={(id) => {
                    const selectedIDs = new Set(id);
                    const selectedRowData = rows.filter((row: any) =>
                        selectedIDs.has(row.id)
                    );

                    setSelection(selectedRowData[0]);
                }}
            />

            {
                selection && (
                    <div className={styles.textAreaContainer}>
                        <div className={styles.textAreaDiv}>
                            <h4 className={styles.textAreaHeading}>Initial text</h4>
                            <textarea
                                value={selection.initialText}
                                className={styles.textAreaSummary}
                                rows={20}
                                disabled
                            />
                        </div>

                        <div className={styles.textAreaDiv}>
                            <h4 className={styles.textAreaHeading}>Result text</h4>
                            <textarea
                                value={selection.resultText}
                                rows={20}
                                className={styles.textAreaSummary}
                                disabled
                            />
                        </div>
                    </div>
                )
            }
        </>
    );
};