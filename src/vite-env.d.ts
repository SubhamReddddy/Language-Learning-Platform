/// <reference types="vite/client" />

type lan = "Hindi" | "Chinese" | "Japanese" | "Spanish";
type cod = "hi" | "zh-Hant" | "ja" | "es"
type col = "#3b82f6" | "#22c55e" | "#ef4444" | "#eab308";
type hov = "#2563eb" | "#16a34a" | "#dc2626" | "#ca8a04";

interface Lanopt {
    language: lan,
    code: cod
    color?: col,
    hover?: hov

}

interface responseType {
    word: string,
    meaning: string,
    options: Array<string>
}

interface reduxInitialType {
    isLoading: boolean,
    data: responseType[],
    result: Array<string>
}