"use client";

import { useState } from "react";

import {
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  Button,
  CircularProgress,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

import ReactDiffViewer from "react-diff-viewer-continued";

import styles from "../page.module.css";

const HomePage = ({ check, plagiarism }: any) => {
  const [shouldCheckGrammarMistakes, setShoudCheckGrammarMistakes] =
    useState<boolean>(false);
  const [shouldCheckSpellingMistakes, setShouldCheckSpellingMistakes] =
    useState<boolean>(false);
  const [shouldCheckPunctuation, setShoudCheckPunctuation] =
    useState<boolean>(false);
  const [improveWordChoice, setImproveWordChoice] = useState<boolean>(false);
  const [useGpt4Model, setUseGpt4Model] = useState<boolean>(false);
  const [shouldRewrite, setShouldRewrite] = useState<boolean>(false);
  const [primaryText, setPrimaryText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddText = (event: any) => {
    const { value } = event.target;
    setPrimaryText(value);
  };

  const handleReset = () => {
    setShoudCheckGrammarMistakes(false);
    setShouldCheckSpellingMistakes(false);
    setShoudCheckPunctuation(false);
    setImproveWordChoice(false);
    setShouldRewrite(false);
    setUseGpt4Model(false);
    setPrimaryText("");
    setOutput("");
  }

  const handleCheckText = async () => {
    setIsLoading(true);
    let checkedText: string | null = null;
    if (!shouldRewrite) {
      checkedText = await check(
        primaryText,
        useGpt4Model ? "gpt-4" : "gpt-3.5-turbo",
        shouldCheckGrammarMistakes,
        shouldCheckSpellingMistakes,
        shouldCheckPunctuation,
        improveWordChoice
      );
    } else {
      console.log("plagiarism");
      checkedText = await plagiarism(
        primaryText,
        useGpt4Model ? "gpt-4" : "gpt-3.5-turbo"
      );
    }
    setOutput(checkedText || "");
    setIsLoading(false);
  };

  const toggleRewrite = () => {
    if (shouldRewrite) {
      setShouldRewrite(false);
    } else {
      setShoudCheckGrammarMistakes(false);
      setShouldCheckSpellingMistakes(false);
      setShoudCheckPunctuation(false);
      setImproveWordChoice(false);
      setShouldRewrite(true);
    }
  }

  const [comparisonMode, setComparisonMode] = useState("diffChars");

  return (
    <>
      <div className={styles.checkboxesContainer}>
        <FormGroup row={true}>
          <FormControlLabel
            control={
              <Checkbox
                checked={shouldCheckGrammarMistakes}
                onClick={() =>
                  setShoudCheckGrammarMistakes(!shouldCheckGrammarMistakes)
                }
              />
            }
            label="Grammar mistakes​"
            disabled={shouldRewrite}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={shouldCheckSpellingMistakes}
                onClick={() =>
                  setShouldCheckSpellingMistakes(!shouldCheckSpellingMistakes)
                }
              />
            }
            label="Spelling mistakes​"
            disabled={shouldRewrite}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={shouldCheckPunctuation}
                onClick={() =>
                  setShoudCheckPunctuation(!shouldCheckPunctuation)
                }
              />
            }
            label="Punctuation"
            disabled={shouldRewrite}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={improveWordChoice}
                onClick={() => setImproveWordChoice(!improveWordChoice)}
              />
            }
            label="Word choice improvements"
            disabled={shouldRewrite}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={shouldRewrite}
                onClick={toggleRewrite}
              />
            }
            label="Rewrite to reduce plagiarism"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={useGpt4Model}
                onClick={() => setUseGpt4Model(!useGpt4Model)}
              />
            }
            label="GPT-4 Turbo"
          />
        </FormGroup>

        {!output && !shouldRewrite && !isLoading && (
          <div className={styles.textAreaContainer}>
            <div className={styles.textAreaDiv}>
              <h4 className={styles.textAreaHeading}>Add your text</h4>
              <textarea
                value={primaryText}
                className={styles.textAreaSummary}
                rows={30}
                onChange={handleAddText}
                style={{ minWidth: "90vw !important" }}
              />
            </div>
          </div>
        )}

        {!isLoading && shouldRewrite && (

          <div className={styles.textAreaContainer}>
            <div className={styles.textAreaDiv}>
              <h4 className={styles.textAreaHeading}>Add your text</h4>
              <textarea
                value={primaryText}
                className={styles.textAreaSummary}
                rows={30}
                onChange={handleAddText}
                style={{ minWidth: "90vw !important" }}
              />
            </div>

            <div className={styles.textAreaDiv}>
              <h4 className={styles.textAreaHeading}>Result</h4>
              <textarea
                value={output}
                className={styles.textAreaSummary}
                rows={30}
                onChange={handleAddText}
                style={{ minWidth: "90vw !important" }}
              />
            </div>
          </div>
        )}

        {isLoading ? (
          <div className={styles.spinner}>
            <CircularProgress size={100} />
          </div>
        ) : (
          output && !shouldRewrite && (
            <div>
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
              <div style={{ height: "65vh", overflowY: "auto" }}>
                <ReactDiffViewer
                  oldValue={primaryText}
                  newValue={output}
                  splitView={true}
                  hideLineNumbers={true}
                  leftTitle={"Initial text"}
                  rightTitle={"Corrected text"}
                  //@ts-ignore
                  compareMethod={comparisonMode}
                />
              </div>
            </div>
          )
        )}

        {
          output
            ?
            <Button
              style={{ background: "#00607A", marginTop: 20 }}
              variant="contained"
              onClick={handleReset}
            >
              Reset
            </Button>
            :
            <Button
              style={{ background: "#00607A", marginTop: 20 }}
              variant="contained"
              onClick={handleCheckText}
              disabled={isLoading}
            >
              Check
            </Button>
        }
      </div>
    </>
  );
};

export default HomePage;
