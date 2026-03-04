import type { HealthPlanResponse } from "../interface/health";

const MODEL_ID = "gemini-flash-latest";
const GENERATE_CONTENT_API = "streamGenerateContent";

export interface GenerateLLMOptions {
  input: string;
  systemInstruction: string;
}

/**
 * Sends a request to the Gemini API to generate content.
 */
export async function generateLLMContent({
  input,
  systemInstruction,
}: GenerateLLMOptions): Promise<HealthPlanResponse | null> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:${GENERATE_CONTENT_API}?key=${import.meta.env.VITE_GEMINI_API_KEY}`;

  const requestBody = {
    systemInstruction: {
      parts: [
        {
          text: systemInstruction,
        },
      ],
    },
    contents: [
      {
        role: "user",
        parts: [
          {
            text: input,
          },
        ],
      },
    ],
    generationConfig: {
      thinkingConfig: {
        thinkingBudget: -1,
      },
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          summary: {
            type: "object",
            properties: {
              status: {
                type: "string",
              },
              description: {
                type: "string",
              },
            },
            required: ["status", "description"],
            propertyOrdering: ["status", "description"],
          },
          timeline: {
            type: "object",
            properties: {
              estimatedWeeks: {
                type: "number",
              },
              progressPercentage: {
                type: "number",
              },
            },
            required: ["estimatedWeeks", "progressPercentage"],
            propertyOrdering: ["estimatedWeeks", "progressPercentage"],
          },
          exerciseCalendar: {
            type: "array",
            items: {
              type: "object",
              properties: {
                day: {
                  type: "string",
                },
                activity: {
                  type: "string",
                },
                duration: {
                  type: "string",
                },
                caloriesBurned: {
                  type: "string",
                },
              },
              required: ["day", "activity", "duration", "caloriesBurned"],
              propertyOrdering: [
                "day",
                "activity",
                "duration",
                "caloriesBurned",
              ],
            },
          },
          nutrition: {
            type: "object",
            properties: {
              dailyCalories: {
                type: "number",
              },
              macroBreakdown: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                    },
                    valueInGrams: {
                      type: "number",
                    },
                    percentage: {
                      type: "string",
                    },
                  },
                  required: ["type", "valueInGrams", "percentage"],
                  propertyOrdering: ["type", "valueInGrams", "percentage"],
                },
              },
              dietaryRecommendations: {
                type: "object",
                properties: {
                  focus: {
                    type: "string",
                  },
                  postWorkoutSpecifics: {
                    type: "string",
                  },
                  suggestedFoods: {
                    type: "string",
                  },
                  toAvoid: {
                    type: "string",
                  },
                },
                required: [
                  "focus",
                  "postWorkoutSpecifics",
                  "suggestedFoods",
                  "toAvoid",
                ],
                propertyOrdering: [
                  "focus",
                  "postWorkoutSpecifics",
                  "suggestedFoods",
                  "toAvoid",
                ],
              },
            },
            required: [
              "dailyCalories",
              "macroBreakdown",
              "dietaryRecommendations",
            ],
            propertyOrdering: [
              "dailyCalories",
              "macroBreakdown",
              "dietaryRecommendations",
            ],
          },
          weightProgress: {
            type: "array",
            items: {
              type: "object",
              properties: {
                week: {
                  type: "string",
                },
                weight: {
                  type: "string",
                },
              },
              required: ["week", "weight"],
              propertyOrdering: ["week", "weight"],
            },
          },
          compositions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                activity: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                      },
                      value: {
                        type: "string",
                      },
                    },
                    required: ["type", "value"],
                    propertyOrdering: ["type", "value"],
                  },
                },
                body: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                      },
                      value: {
                        type: "string",
                      },
                    },
                    required: ["type", "value"],
                    propertyOrdering: ["type", "value"],
                  },
                },
              },
              required: ["activity", "body"],
              propertyOrdering: ["activity", "body"],
            },
          },
        },
        required: [
          "summary",
          "timeline",
          "exerciseCalendar",
          "nutrition",
          "weightProgress",
          "compositions",
        ],
        propertyOrdering: [
          "summary",
          "timeline",
          "exerciseCalendar",
          "nutrition",
          "weightProgress",
          "compositions",
        ],
      },
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Gemini API Error (${response.status} ${response.statusText}): ${errorText}`,
      );
    }

    const res = await response.json();

    let fullText = "";
    if (Array.isArray(res)) {
      for (const chunk of res) {
        if (chunk.candidates?.[0]?.content?.parts?.[0]?.text) {
          fullText += chunk.candidates[0].content.parts[0].text;
        }
      }
    } else if (res?.candidates?.[0]?.content?.parts?.[0]?.text) {
      fullText = res.candidates[0].content.parts[0].text;
    }

    if (fullText) {
      return JSON.parse(fullText) as HealthPlanResponse;
    }

    return null;
  } catch (error) {
    return null;
  }
}
