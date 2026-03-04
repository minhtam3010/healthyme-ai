import { useState } from "react";
import type { HealthPlanResponse } from "../../interface/health";
import { generateLLMContent } from "../../llm/api";
import { healthConsultantPrompt } from "../../llm/prompt";

export const useGenerateContent = () => {
  const [healthResponse, setHealthResponse] =
    useState<HealthPlanResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function generate(input: string) {
    setLoading(true);
    const res = await generateLLMContent({
      input,
      systemInstruction: healthConsultantPrompt,
    });

    setHealthResponse(res);
    setLoading(false);
  }

  return { generate, healthResponse, loading };
};
