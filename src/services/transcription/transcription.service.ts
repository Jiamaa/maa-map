import openai from "@/src/libs/openai";
import { TranscriptionResult } from "@/src/models/transcription.model";

export async function transcribeAudio(audioBlob: Blob): Promise<TranscriptionResult> {
    try{
        const arrayBuffer = await audioBlob.arrayBuffer();
        const file = new File([arrayBuffer], 'audio.webm', { type: 'audio/webm' });

        console.log('In progress transcribing...');

        const transcription = await openai.audio.transcriptions.create({
            file: file,
            model: 'whisper-1',
            language: 'en',
            response_format: 'text',
            temperature: 0,
        });

        console.log('Finished transcribing:', transcription);

        return { 
            text: transcription,
        };
    } catch (error) {
        console.error('Error during transcription:', error);
        return {
            text: '',
            error: error instanceof Error ? error.message : 'Failed to transcribe audio. Please try again.',
        };
    }
}