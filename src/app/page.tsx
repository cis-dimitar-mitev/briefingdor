"use client";

import { Button } from "@mui/material";
import styles from "./page.module.css";
import { test } from "./actions";
import { useState } from "react";
import HomePage from "./components/HomePage";

export default function Home() {
  const [mockState, setMockState] = useState("");

  const handleServerAction = async () => {
    const temp = await test();
    setMockState(temp);
  };

  return (
    <main className={styles.main}>
      {/* <div className={styles.description}>
        {mockState}

        <Button variant="outlined" onClick={() => handleServerAction()}>
          Test
        </Button>

      </div> */}

      <HomePage />
    </main>
  );
}
