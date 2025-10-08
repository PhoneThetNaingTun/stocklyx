"use client";

import { toast } from "sonner";

type ToastType = "success" | "error" | "info" | "warning";

interface ShowToastOptions {
  title: string;
  description?: string;
  type?: ToastType;
  actionLabel?: string;
  onAction?: () => void;
}

export function showToast({
  title,
  description,
  type = "success",
  actionLabel,
  onAction,
}: ShowToastOptions) {
  const fn =
    type === "error"
      ? toast.error
      : type === "info"
      ? toast.info
      : type === "warning"
      ? toast.warning
      : toast.success;

  fn(title, {
    description,
    action:
      actionLabel && onAction
        ? {
            label: actionLabel,
            onClick: onAction,
          }
        : undefined,
  });
}
