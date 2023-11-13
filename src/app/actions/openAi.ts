'use server';

import OpenAI from 'openai';
import * as fs from 'fs';
import { FileObject } from 'openai/resources/files.mjs';
import { Stream } from 'stream';
import { FsReadStream } from 'openai/_shims/index.mjs';

const openai = new OpenAI();

export async function main() {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-3.5-turbo',
    });

    return chatCompletion;
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