/// <reference types="vite/client" />

type lan = "Hindi" | "Chinese" | "Japanese" | "Spanish";
type cod = "hi" | "zh-Hant" | "ja" | "es";
type col = "#3b82f6" | "#22c55e" | "#ef4444" | "#eab308";
type hov = "#2563eb" | "#16a34a" | "#dc2626" | "#ca8a04";

interface Lanopt {
  language: lan;
  code: cod;
  color?: col;
  hover?: hov;
}

interface responseType {
  word: string;
  meaning: string;
  options: Array<string>;
}

interface reduxInitialType {
  isLoading: boolean;
  data: responseType[];
  result: Array<string>;
}

interface register {
  username: string;
  email: string;
  password: string;
}
interface login {
  email: string;
  password: string;
}

type User = {
  _id: string;
  username: string;
  email: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

type TaskItem = {
  word: string;
  meaning: string;
  _id: string;
};

type CarrierItem = {
  task: TaskItem[];
  ans: string[];
  _id: string;
};

type Tasks = {
  _id: string;
  userID: string;
  __v: number;
  carrier: CarrierItem[];
};

type Root = {
  tasks: Tasks;
};
