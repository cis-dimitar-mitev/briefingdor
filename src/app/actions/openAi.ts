'use server';

import OpenAI from 'openai';
import * as fs from 'fs';
import { FileObject } from 'openai/resources/files.mjs';
import { Stream } from 'stream';
import { FsReadStream } from 'openai/_shims/index.mjs';
import OPEN_AI_MODELS from '@/utilis/utilis';

const openai = new OpenAI();
const model = 'gpt-3.5-turbo';

export async function check( text: string, gramarCheck: boolean = true, spellCheck: boolean = true, punctuationCheck: boolean = true, wordsCheck: boolean = true) {
    let promp = 'You are news analyst in Cision and you are writing daily news briefings.'+
    'You have been given the task to proofread and suggest improvements of another analyst’s daily writeup.'+
    `You should check the text below for ${gramarCheck! ? '' : 'grammar mistakes ,'}${spellCheck! ? '' : 'spelling mistakes, '}`+
    `${punctuationCheck! ? '' : 'punctuation'}, without touching the quoted parts. `+
    `${wordsCheck! ? '' : 'You should also suggest improvements for word choice.'}`;

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: promp }, 
        { role: 'user', content: text }],
        model: model,
    });

    let promptTokens = chatCompletion.usage?.prompt_tokens?? 0;
    let completionsTokens = chatCompletion.usage?.completion_tokens?? 0;

    let cost = OPEN_AI_MODELS[model].prompt * promptTokens + OPEN_AI_MODELS[model].completion * completionsTokens;

    return { 'text': chatCompletion.choices[0].message.content, 'cost': cost}; 
}


/**
 * Uploads a file to OpenAI's file storage service.
 * @param fileStream A readable stream of the file to upload.
 * @param purpose The purpose of the file upload. Can be "assistants" or "fine-tune". Defaults to "assistants".
 * @returns A Promise that resolves to a FileObject representing the uploaded file.
 */
export async function uploadFile(fileStream: FsReadStream, purpose: "assistants" | "fine-tune" = "assistants"): Promise<FileObject> {
    const file = await openai.files.create({
        file: fileStream,
        purpose: purpose,
    });

    return file;
}