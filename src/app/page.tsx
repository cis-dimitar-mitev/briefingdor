"use client";

import { Button } from "@mui/material";
import styles from "./page.module.css";
import { useState } from "react";
import { main } from "./actions/openAi"

export default function Home() {
  const [mockState, setMockState] = useState<any>();

  const handleServerAction = async () => {
    const temp = await main();
    setMockState(JSON.stringify(temp));
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        {mockState}

        <Button variant="outlined" onClick={() => handleServerAction()}>
          Test
        </Button>
      </div>
    </main>
  );
}
