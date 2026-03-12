import { useEffect, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { TransactionStatus, TransactionEvent } from "../types/transaction.types";

interface UseTransactionEventsOptions {
  transactionId: string;
  onStatusChange?: (status: TransactionStatus, message: string) => void;
  enabled?: boolean;
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

    const eventSource = new EventSource(
      `/api/v1/transactions/${transactionId}/events`
    );
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      try {
        const data: TransactionEvent = JSON.parse(event.data);

        if (data.type === "status_change") {
          onStatusChange?.(data.status, data.message);

          queryClient.setQueryData(["transaction", transactionId], (old: any) => ({
            ...old,
            status: data.status,
          }));

          if (data.status === "completed" || data.status === "failed") {
            eventSource.close();
          }
        }
      } catch (error) {
        console.error("Failed to parse SSE event:", error);
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
    return () => {
      cleanup?.();
    };
  }, [connect]);

  const close = useCallback(() => {
    eventSourceRef.current?.close();
  }, []);

  return {
    close,
  };
}
