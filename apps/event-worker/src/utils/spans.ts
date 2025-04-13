import type { Span, Tracer } from "@opentelemetry/api";
import { SpanStatusCode } from "@opentelemetry/api";

export const withSpan =
  (tracer: Tracer) =>
  async <T>(
    name: string,
    operation: (span: Span) => Promise<T>,
    attributes: Record<string, string> = {},
  ): Promise<T> => {
    return tracer.startActiveSpan(name, async (span) => {
      try {
        Object.entries(attributes).forEach(([key, value]) => {
          span.setAttribute(key, value);
        });
        const result = await operation(span);
        return result;
      } catch (error) {
        span.recordException(error as Error);
        span.setStatus({ code: SpanStatusCode.ERROR });
        throw error;
      } finally {
        span.end();
      }
    });
  };
