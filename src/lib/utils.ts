import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function localImageToFile(
  path: string,
  filename: string
): Promise<File> {
  const response = await fetch(path);
  const data = await response.blob();
  return new File([data], filename);
}
