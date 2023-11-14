import { Suspense } from "react";
import styles from "../page.module.css";
import { getHistory } from "../actions/getHistory";
import { History as ClientSideHistory } from "../components/History";

export default async function History() {
  const rows = await getHistory();

  return (
    <div className={styles.historyContainer}>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientSideHistory
          rows={rows.map((row) => ({
            resultText: row.resultText,
            initialText: row.initialText,
            price: row.cost,
            id: row.id,
            isGrammar: row.hasGrammarCheck,
            isVocab: row.hasVocabularyCheck,
            isPunct: row.hasPunctuationCheck,
            isWordChoice: row.hasWordChoiceImprovement,
            isPlagiarismL: row.hasPlagiarismRephrase,
            isGPT4: row.useGpt4,
            date: row.timestamp,
          }))}
        />
      </Suspense>
    </div>
  );
}
