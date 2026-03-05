import { Card, Typography } from "antd";
import { Pie } from "@ant-design/plots";
import { ACTIVITY_COLORS } from "./constants";

const { Text } = Typography;

const BODY_ITEMS = [
  { label: "Muscle", key: "muscle", color: "#2563eb" },
  { label: "Fat", key: "fat", color: "#ef4444" },
  { label: "Water", key: "water", color: "#f59e0b" },
  { label: "Bone", key: "bone", color: "#22c55e" },
] as const;

interface BodyPart {
  type: string;
  value: string | number;
}

interface ActivityItem {
  name: string;
  percentage: number;
}

interface BodyCompositionProps {
  bodyParts: BodyPart[];
  activityData: ActivityItem[];
}

function getBodyValue(parts: BodyPart[], key: string): number {
  const found = parts.find((b) => b.type?.toLowerCase().includes(key));
  return found ? parseFloat(String(found.value)) || 0 : 0;
}

export default function BodyComposition({
  bodyParts,
  activityData,
}: BodyCompositionProps) {
  const bodyData = BODY_ITEMS.map((item) => ({
    type: item.label,
    value: getBodyValue(bodyParts, item.key),
  })).filter((d) => d.value > 0);

  const bodyPieConfig = {
    data: bodyData,
    angleField: "value",
    colorField: "type",
    innerRadius: 0,
    radius: 0.8,
    scale: {
      color: {
        range: BODY_ITEMS.map((item) => item.color),
      },
    },
    label: {
      text: "type",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: { position: "bottom", layout: { justifyContent: "center" } },
    },
    tooltip: {
      title: "type",
      items: [{ field: "value", valueFormatter: (v: number) => `${v}%` }],
    },
    height: 300,
  };

  const activityDonutConfig = {
    data: activityData,
    angleField: "percentage",
    colorField: "name",
    innerRadius: 0.6,
    radius: 0.8,
    scale: {
      color: {
        range: ACTIVITY_COLORS,
      },
    },
    label: {
      text: (d: ActivityItem) => `${d.percentage}%`,
      position: "outside",
      style: { fontWeight: "bold" },
    },
    legend: {
      color: { position: "bottom", layout: { justifyContent: "center" } },
    },
    tooltip: {
      title: "name",
      items: [{ field: "percentage", valueFormatter: (v: number) => `${v}%` }],
    },
    height: 300,
  };

  return (
    <>
      <Card style={{ marginBottom: 12, borderRadius: 16 }} className="ant-card">
        <Text
          style={{
            display: "block",
            marginBottom: 12,
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          Body Composition
        </Text>
        <Pie {...bodyPieConfig} />
      </Card>

      {activityData.length > 0 && (
        <Card
          style={{ marginBottom: 12, borderRadius: 16 }}
          className="ant-card"
        >
          <Text
            style={{
              display: "block",
              marginBottom: 12,
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            Activity Composition
          </Text>
          <Pie {...activityDonutConfig} />
        </Card>
      )}
    </>
  );
}
