import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {AxiosError} from "axios";
import {toast} from "sonner";
import {QueryClient} from "@tanstack/react-query";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type DialogImperative = {
  open: () => void,
}

export const axiosErrorHandler = (error: Error) => {
  const axiosError = error as AxiosError<{ message: string }>;
  toast.error(axiosError.response?.data?.message || "Sorry! connection failed")
}

export const queryClient = new QueryClient()