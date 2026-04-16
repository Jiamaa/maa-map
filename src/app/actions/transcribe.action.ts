'use server';

import { TranscriptionResult } from "@/src/models/transcription.model";
import { transcribeAudio } from "@/src/services/transcription/transcription.service";

export default async function TranscribeAction(audio: Blob): Promise<TranscriptionResult> {
    try{
        const { text: transcription } = await transcribeAudio(audio);
        
        return {
            text: transcription,
        };
    } catch (error) {
        console.error('Transcription error:', error);
        return {
            text: '',
            error: error instanceof Error ? error.message : 'An unexpected error occurred during transcription.',
        };
    }
}