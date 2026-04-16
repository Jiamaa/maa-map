'use client';

type TranscriptDisplayProps = {
    text: string;
    isLoading: boolean;
    error?: string;
}

export function TranscriptionDisplay({
    text,
    isLoading,
    error
}: TranscriptDisplayProps){
    if(isLoading){
        return(
            <div className="flex items-center justify-center gap-2 text-gray-600">
                <span>Transcribing...</span>
            </div>
        )
    }
    if(error){
        return(
            <div className="text-red-500 text-center">
                <p>Error: {error}</p>
            </div>
        );
    }

    if(!text){
        return null;
    }

    return(
        <div className="relative z-10 flex justify-center items-center py-4">
            <p className="text-gray-500 whitespace-pre-wrap text-center">{text}</p>
        </div>
    )
}