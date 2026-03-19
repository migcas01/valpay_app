import { useEffect, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { TransactionStatus } from "../types/transaction.types";

// SSE event shape from the backend
interface RawSseEvent {
  status: string;
}

interface UseTransactionEventsOptions {
  transactionId: string;
  onStatusChange?: (status: TransactionStatus, message: string) => void;
  enabled?: boolean;
}

function toTransactionStatus(raw: string): TransactionStatus {
  const s = raw.toUpperCase();
  if (s === "SUCCESS" || s === "AUTHORIZED") return "completed";
  if (s === "FAILED" || s === "NOT_AUTHORIZED" || s === "VOIDED") return "failed";
  return "pending";
}

export function useTransactionEvents({
  transactionId,
  onStatusChange,
  enabled = true,
}: UseTransactionEventsOptions) {
  const eventSourceRef = useRef<EventSource | null>(null);
  const queryClient = useQueryClient();

  const connect = useCallback(() => {
    if (!enabled || !transactionId) return;

    // Use the API base URL from env so it works in dev (localhost:3000) and prod
    const apiBase = import.meta.env.VITE_VALPAY_API_URL?.replace(/\/$/, "") ?? "";
    const url = `${apiBase}/transactions/${transactionId}/events`;

    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      try {
        const data: RawSseEvent = JSON.parse(event.data);
        const status = toTransactionStatus(data.status);

        onStatusChange?.(status, "");

        queryClient.setQueryData(["transaction", transactionId], (old: unknown) =>
          old && typeof old === "object" ? { ...old, status } : old
        );

        if (status === "completed" || status === "failed") {
          eventSource.close();
        }
      } catch (err) {
        console.error("[SSE] Failed to parse event:", err);
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [transactionId, enabled, onStatusChange, queryClient]);

  useEffect(() => {
    const cleanup = connect();
    return () => cleanup?.();
  }, [connect]);

  const close = useCallback(() => {
    eventSourceRef.current?.close();
  }, []);

  return { close };
}
