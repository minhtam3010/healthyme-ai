import { Card, Typography } from "antd";
import { Line } from "@ant-design/plots";

const { Text } = Typography;

interface WeightProgressProps {
  data: { week: string | number; weight: string | number }[];
  goalWeight: number;
}

export default function WeightProgress({
  data,
  goalWeight,
}: WeightProgressProps) {
  const formattedData = data.map((d) => ({
    week: String(d.week),
    weight: parseFloat(String(d.weight)),
  }));

  const config = {
    data: formattedData,
    xField: "week",
    yField: "weight",
    point: {
      shapeField: "circle",
      sizeField: 4,
    },
    annotations: [
      {
        type: "lineY",
        yField: goalWeight,
        style: {
          stroke: "#52c41a",
          lineDash: [4, 4],
          lineWidth: 2,
        },
        label: {
          text: `GoalWeight: ${goalWeight}`,
          position: "top",
          style: {
            textBaseline: "bottom",
            fill: "#52c41a",
          },
        },
      },
    ],
    height: 200,
  };

  return (
    <Card
      style={{ marginBottom: 12, borderRadius: 16 }}
      data-pdf-row="weight-progress"
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: 700,
          display: "block",
          marginBottom: 12,
        }}
      >
        Weight Progress
      </Text>
      <Line {...config} />
    </Card>
  );
}
