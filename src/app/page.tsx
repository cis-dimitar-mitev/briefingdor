import styles from "./page.module.css";

import HomePage from "./components/HomePage";
import { check, plagiarism } from "./actions/openAi";

export default function Home() {
  return (
    <main className={styles.main}>
      <HomePage check={check} plagiarism={plagiarism} />
    </main>
  );
}
