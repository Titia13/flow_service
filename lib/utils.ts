import { App } from "@/app/features/types/template";
import { clsx, type ClassValue } from "clsx"
import Swal from "sweetalert2";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// fonction pour extraire appId
export function extractAppId(appId: App | string | undefined): string | undefined {
  if (!appId) return undefined;
  return typeof appId === "object" ? appId._id : appId;
}

// fonction pour extraire AppCode
export function extractAppCode(AppCode: App | string | undefined): string | undefined {
  if (!AppCode) return undefined;
  return typeof AppCode === "object" ? AppCode.code : AppCode;
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
