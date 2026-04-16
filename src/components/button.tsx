'use client';

import { useState, useRef } from "react";

type AudiorecorderProps = {
    onRetryRecording: () => void;
    onRecordingComplete: (audioBlob: Blob) => void;
}

export function RecordButton({
    onRetryRecording,
    onRecordingComplete,
}: AudiorecorderProps){
    const [isRecording, setIsRecording] = useState(false);
    const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);

    const audioChunksRef = useRef<Blob[]>([]);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const handleStartRecording = async () => {
        setRecordedAudioUrl(null);

        audioChunksRef.current = [];

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.addEventListener("dataavailable", (event) => {
            if(event.data.size > 0){
                audioChunksRef.current.push(event.data);
            }
        });

        mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
            const audioUrl = URL.createObjectURL(audioBlob);
            setRecordedAudioUrl(audioUrl);
            onRecordingComplete(audioBlob);
        });

        mediaRecorder.start(500);

        setIsRecording(true);

    };

    const handleStopRecording = () => {
        if(mediaRecorderRef.current){
            mediaRecorderRef.current.stop();

            mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());

            setIsRecording(false);
        }
    };
    
    const handleRecordAgain = () => {
        setRecordedAudioUrl(null);
        
        audioChunksRef.current = [];
        setIsRecording(false);

        onRetryRecording();
    };

    return(
        <div className="relative z-10 flex justify-center items-center">
            <button onClick={isRecording ? handleStopRecording : handleStartRecording}
                className="flex h-15 w-15 items-center justify-center rounded-full bg-[#739EC9] p-4 font-bold text-gray-800 hover:bg-[#5682B1] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 cursor-pointer">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V22M8 22H16M12 15C10.3431 15 9 13.6569 9 12V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V12C15 13.6569 13.6569 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    )
}