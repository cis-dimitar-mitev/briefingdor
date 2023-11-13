"use client";

import React, { useState } from 'react';
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  CircularProgress
} from '@mui/material';
import styles from '../page.module.css';

const HomePage = () => {
  const [shouldCheckGrammarMistakes, setShoudCheckGrammarMistakes] = useState<boolean>(false);
  const [shouldCheckSpellingMistakes, setShouldCheckSpellingMistakes] = useState<boolean>(false);
  const [shouldCheckPunctuation, setShoudCheckPunctuation] = useState<boolean>(false);
  const [improveWordChoice, setImproveWordChoice] = useState<boolean>(false);
  const [shouldRewrite, setShouldRewrite] = useState<boolean>(false);
  const [primaryText, setPrimaryText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddText = (event: any) => {
    const { value } = event.target;
    setPrimaryText(value);
  }

  const handleCheckText = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setOutput(primaryText);
    }, 2000)
  }

  return (
    <>
      <div className={styles.checkboxesContainer}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={shouldCheckGrammarMistakes} onClick={() => setShoudCheckGrammarMistakes(!shouldCheckGrammarMistakes)} />}
            label="Grammar mistakes​"
          />

          <FormControlLabel
            control={<Checkbox checked={shouldCheckSpellingMistakes} onClick={() => setShouldCheckSpellingMistakes(!shouldCheckSpellingMistakes)} />}
            label="Spelling mistakes​"
          />

          <FormControlLabel
            control={<Checkbox checked={shouldCheckPunctuation} onClick={() => setShoudCheckPunctuation(!shouldCheckPunctuation)} />}
            label="Punctuation"
          />

          <FormControlLabel
            control={<Checkbox checked={improveWordChoice} onClick={() => setImproveWordChoice(!improveWordChoice)} />}
            label="Word choice improvements"
          />

          <FormControlLabel
            control={<Checkbox checked={shouldRewrite} onClick={() => setShouldRewrite(!shouldRewrite)} />}
            label="Rewrite to reduce plagiarism"
          />
        </FormGroup>

        <div className={styles.textAreaContainer}>
          <div className={styles.textAreaDiv}>
            <h4 className={styles.textAreaHeading}>Add your text</h4>
            <textarea value={primaryText} className={styles.textAreaSummary} rows={20} onChange={handleAddText} />
          </div>

          <div className={styles.textAreaDiv}>
            <h4 className={styles.textAreaHeading}>Output</h4>

            {
              isLoading
                ?
                (<div className={styles.spinner}>
                  <CircularProgress size={100} />
                </div>)
                :
                (<textarea value={output} rows={20} className={styles.textAreaSummary} onChange={handleAddText} />)
            }

          </div>
        </div>

        <Button variant="outlined" onClick={handleCheckText}>
          Check
        </Button>
      </div>
    </>
  );
}

export default HomePage;