import { App } from "@/app/features/types/template";
import { clsx, type ClassValue } from "clsx"
import Swal from "sweetalert2";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// fonction pour extraire appId
// export function extractAppId(appId: App | string | undefined): string | undefined {
//   if (!appId) return undefined;
//   return typeof appId === "object" ? appId._id : appId;
// }

// fonction pour extraire AppCode
export function extractAppCode(AppCode: App | string | undefined): string | undefined {
  if (!AppCode) return undefined;
  return typeof AppCode === "object" ? AppCode.code : AppCode;
}

export function extractAppId(applicationId: any): string | undefined {
  if (!applicationId) return undefined;
  if (typeof applicationId === "string") return applicationId;
  return applicationId._id || applicationId.id || undefined;
}

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 4000,
  background: '#ffffff',
  color: '#6b7280',
  didOpen: (toast) => {
    toast.style.border = '1px solid #ffffff';
  }
});


// export function sanitizeHtml(raw: string | undefined | null): string{
//   if (!raw) return '';
//   return raw
//     .replace(/\u00A0/g, ' ')        // nbsp -> espace normal
//     .replace(/[\u201C\u201D]/g, '"') // smart quotes -> "
//     .replace(/[\u2018\u2019]/g, "'") // smart quotes -> '
//     .replace(/\u200B/g, '')          // zero-width space
//     .replace(/\r\n/g, '\n');         // normaliser les retours ligne
// }