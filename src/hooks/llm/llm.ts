import { useState, useRef } from "react";
import type { HealthPlanResponse } from "../../interface/health";
import { generateLLMContent } from "../../llm/api";
import { healthConsultantPrompt } from "../../llm/prompt";
import { notification } from "antd";

export const useGenerateContent = () => {
  const [healthResponse, setHealthResponse] =
    useState<HealthPlanResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function generate(input: string) {
    // Clear any pending retry timer
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }

    setLoading(true);
    const result = await generateLLMContent({
      input,
      systemInstruction: healthConsultantPrompt,
    });

    if (!result) {
      setLoading(false);
      return;
    }

    // Rate limit hit — notify user and schedule auto-retry
    if ("rateLimitMs" in result) {
      const seconds = Math.ceil(result.rateLimitMs / 1000);
      notification.warning({
        message: "⏳ Rate limit hit",
        description: `Auto-retrying in ${seconds}s...`,
        duration: seconds,
        placement: "top",
        style: {
          width: 220,
          fontSize: 12,
          padding: "10px 14px",
        },
      });

      retryTimerRef.current = setTimeout(() => {
        generate(input);
      }, result.rateLimitMs);

      setLoading(false);
      return;
    }

    // Success
    setHealthResponse(result.data);
    setLoading(false);
  }

  return { generate, healthResponse, loading };
};
