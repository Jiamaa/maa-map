'use client';

import { useState } from "react";
import Navbar from "../components/nabvar";
import dynamic from "next/dynamic";
import { TranscriptionDisplay } from "../components/transcriptDisplay";
import { RecordButton } from "../components/button";
import TranscribeAction from "./actions/transcribe.action";

const MapWindow = dynamic(() => import("../components/mapWindow"), { ssr: false });

export default function Home() {
  const [transcription, setTranscription] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleRecordingComplete = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    setError(undefined);

    try{
      const result = await TranscribeAction(audioBlob);
      if(result.error){
        setError(result.error);
      }else{
        setTranscription(result.text);
      }
    }catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred during transcription.');
    } finally {
      setIsTranscribing(false);
    }
    
    console.log("Recording complete:", audioBlob);
  };

  const handleRetryRecording = () => {
    console.log("Retrying recording");
    setTranscription("");
    setError(undefined);
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
      <main className="flex flex-col items-center gap-4 px-4 py-6 mt-20 mb-10">
        <MapWindow />
        <TranscriptionDisplay text={transcription} isLoading={isTranscribing} error={error} />
        <RecordButton onRecordingComplete={handleRecordingComplete} onRetryRecording={handleRetryRecording} />
      </main>
    </div>
  );
}
