/*
  Warnings:

  - Added the required column `hasGrammarCheck` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasPlagiarismRephrase` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasPunctuationCheck` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasVocabularyCheck` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasWordChoiceImprovement` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `useGpt4` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" ADD COLUMN     "hasGrammarCheck" BOOLEAN NOT NULL,
ADD COLUMN     "hasPlagiarismRephrase" BOOLEAN NOT NULL,
ADD COLUMN     "hasPunctuationCheck" BOOLEAN NOT NULL,
ADD COLUMN     "hasVocabularyCheck" BOOLEAN NOT NULL,
ADD COLUMN     "hasWordChoiceImprovement" BOOLEAN NOT NULL,
ADD COLUMN     "useGpt4" BOOLEAN NOT NULL;
