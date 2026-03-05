import { Card, Flex, Typography } from "antd";
import { Pie } from "@ant-design/plots";
import { MACRO_COLORS } from "./constants";

const { Text } = Typography;

interface MacroItem {
  type: string;
  value: number;
}

interface NutritionInsightsProps {
  dailyCalories?: number | string;
  macroBreakdown: MacroItem[];
  focus?: string;
}

export default function NutritionInsights({
  dailyCalories,
  macroBreakdown,
  focus,
}: NutritionInsightsProps) {
  return (
    <Card style={{ marginBottom: 12, borderRadius: 16 }}>
      <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 700 }}>
        Nutrition Insights
      </p>

      <Flex gap={20} align="center">
        {/* Donut chart with centred kcal label */}
        <div
          style={{
            width: 140,
            height: 140,
            flexShrink: 0,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 800, lineHeight: 1 }}>
              {dailyCalories || "—"}
            </span>
            <span
              style={{
                fontSize: 9,
                color: "#aaa",
                fontWeight: 600,
                letterSpacing: 0.5,
                marginTop: 2,
              }}
            >
              KCAL
            </span>
          </div>
          <Pie
            data={macroBreakdown}
            angleField="value"
            colorField="type"
            innerRadius={0.65}
            height={140}
            width={140}
            legend={false as unknown as undefined}
            scale={{ color: { range: MACRO_COLORS } }}
          />
        </div>

        {/* Legend */}
        <Flex vertical gap={8}>
          {macroBreakdown.map((m, i) => (
            <Flex key={i} align="center" gap={8}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: MACRO_COLORS[i] || "#ccc",
                  flexShrink: 0,
                }}
              />
              <Text style={{ fontSize: 13 }}>{m.type}</Text>
            </Flex>
          ))}
        </Flex>
      </Flex>

      {focus && (
        <p
          style={{
            marginTop: 10,
            marginBottom: 0,
            fontSize: 12,
            color: "#888",
          }}
        >
          <Text strong>Focus:</Text> {focus}
        </p>
      )}
    </Card>
  );
}
