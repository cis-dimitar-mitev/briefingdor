"use server";

import OpenAI from "openai";
import { FileObject } from "openai/resources/files.mjs";
import { FsReadStream } from "openai/_shims/index.mjs";
import OPEN_AI_MODELS from "@/utilis/utilis";
import { prisma } from "@/db";

const openai = new OpenAI();

/**
 * Checks the given text for grammar, spelling, punctuation, and word choice errors using OpenAI's GPT-3 model.
 * 
 * @param text - The text to check.
 * @param gramarCheck - Whether to check for grammar mistakes. Defaults to true.
 * @param spellCheck - Whether to check for spelling mistakes. Defaults to true.
 * @param punctuationCheck - Whether to check for punctuation errors. Defaults to true.
 * @param wordsCheck - Whether to suggest improvements for word choice. Defaults to true.
 * @returns The corrected text.
 */
export async function check(
    text: string,
    model: string = "gpt-3.5-turbo",
    gramarCheck: boolean = true,
    spellCheck: boolean = true,
    punctuationCheck: boolean = true,
    wordsCheck: boolean = true
) {
    let prompt =
        "You are news analyst in Cision and you are writing daily news briefings." +
        "You have been given the task to proofread and suggest improvements of another analyst’s daily writeup." +
        `You should check the text below for ${!gramarCheck ? "" : "grammar mistakes ,"
        }${!spellCheck ? "" : "spelling mistakes, "}` +
        `${!punctuationCheck ? "" : "punctuation"
        }, without touching the quoted parts. ` +
        `${!wordsCheck ? "" : "You should also suggest improvements for word choice."
        }`;

    const chatCompletion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: prompt },
            { role: "user", content: text },
        ],
        model: model,
    });

    let promptTokens = chatCompletion.usage?.prompt_tokens ?? 0;
    let completionsTokens = chatCompletion.usage?.completion_tokens ?? 0;

    let cost =
        OPEN_AI_MODELS[model as keyof typeof OPEN_AI_MODELS].prompt * promptTokens +
        OPEN_AI_MODELS[model as keyof typeof OPEN_AI_MODELS].completion * completionsTokens;

    const resultText = chatCompletion.choices[0].message.content;

    await prisma.history.create({
        data: {
            initialText: text,
            resultText: resultText ?? "",
            cost,
            timestamp: new Date(),
        },
    });

    return resultText;
}

/**
 * Uploads a file to OpenAI's file storage service.
 * @param fileStream A readable stream of the file to upload.
 * @param purpose The purpose of the file upload. Can be "assistants" or "fine-tune". Defaults to "assistants".
 * @returns A Promise that resolves to a FileObject representing the uploaded file.
 */
export async function uploadFile(
    fileStream: FsReadStream,
    purpose: "assistants" | "fine-tune" = "assistants"
): Promise<FileObject> {
    const file = await openai.files.create({
        file: fileStream,
        purpose: purpose,
    });

    return file;
}

/**
 * Checks for plagiarism in the given text by rewriting it to reduce plagiarism without changing the quoted text.
 * @param toCheckForPlagiarism - The text to check for plagiarism.
 * @param model - The OpenAI model to use for the check. Defaults to 'gpt-3.5-turbo'.
 * @returns Returns the rewritten text.
 */
export async function plagiarism(
    toCheckForPlagiarism: string,
    model: string = "gpt-3.5-turbo"
): Promise<string | null> {
    const plagiarismPrompt = `rewrite this text to reduce plagiarism without changing the quoted text`;
    let resultText = '';
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [
                { role: "user", content: `${plagiarismPrompt} ${toCheckForPlagiarism}` },
            ],
            model: model,
        });

        resultText = chatCompletion.choices[0].message.content ?? "";
        console.log(resultText);
    } catch (error) {
        console.error(error);
    }

    return resultText;
}
