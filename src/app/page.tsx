"use client";

import { Button } from "@mui/material";
import styles from "./page.module.css";
import { useState } from "react";
import { check } from "./actions/openAi"

export default function Home() {
  const [mockState, setMockState] = useState<any>();

  const handleServerAction = async (text: string) => {
    const temp = await check(text);
    setMockState(JSON.stringify(temp));
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        {mockState}

        <Button variant="outlined" onClick={() => handleServerAction(`Pennsylvania Senate Honors Harley-Davidson And Davidson Family.
Power Sports Business (11/2) report, “The Pennsylvania Senate has issued a 
proclamation
honoring Willie G. Davidson, the Davidson family and Harley-Davidson Inc. for 120 
years of
continuous motorcycle production and 50 years of making motorcycles in the 
company’s York,
Pennsylvania manufacturing plant.” Willie G. Davidson just published his memoir 
“whic
chronicles the company’s histori and her life as a desendant of the founders and 
leader of the iconic
company.” Davidson mention “the York manufacturing plant several times in the 
book titled ‘Ride
Free, A Memoir.’” The tribute “for Davidson and Harley-Davidson was by 
Pennsylvania Senator
Chris Gebhard and Senator Kristin Phillips-Hill.” Among the attendees was 
“government officials,
Harley-Davidson dealers, riders, Harley-Davidson’s General Manager of York 
Manufacturing Chris
Yurista Sr. and Harley-Davidson Marketing Director and daughter of Willie G. 
Davidson, Karen
Davidson.”
Also reporting on the story are Roadracing World (11/2, Swarts), American Rider 
(11/2), and`)}>
          Test
        </Button>
      </div>
    </main>
  );
}
