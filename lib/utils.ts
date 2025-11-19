import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {AxiosError} from "axios";
import {toast} from "sonner";
import {QueryClient} from "@tanstack/react-query";
import { formatRelative } from 'date-fns'
import { v4 as uuidv4 } from 'uuid';
import {Types} from "mongoose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type DialogImperative = {
  open: () => void,
}

export const axiosErrorHandler = (error: Error) => {
  const axiosError = error as AxiosError<{ message: string }>;
  toast.error(axiosError.response?.data?.message || String(error)  || "Sorry! connection failed", {
    duration: 10000,
  })
}

export const timeAgo = (date?: Date) => {
  return formatRelative(date || new Date(), new Date())
}

export const getUUId = () => {
  return uuidv4()
}

export const getObjectId = (id?: string | null) => {
  if (id) {
    return new Types.ObjectId(id)
  }
  return new Types.ObjectId();
}

/**
 * Returns the first 5 words of a text.
 * If the text has fewer than 5 words, returns the entire text.
 *
 * @param text - The input string
 * @param wordCount - Number of words to extract (default = 5)
 * @returns A truncated string with up to `wordCount` words
 */
export function firstWords(text: string, wordCount = 5): string {
  if (!text?.trim()) return ''

  const words = text.trim().split(/\s+/) // split by any whitespace
  if (words.length <= wordCount) return text.trim()

  return words.slice(0, wordCount).join(' ')
}

export const queryClient = new QueryClient()