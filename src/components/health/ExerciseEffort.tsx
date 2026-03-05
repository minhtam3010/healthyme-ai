import { Card, Flex, Typography } from "antd";
import { Column } from "@ant-design/plots";

const { Text } = Typography;

interface EffortDay {
  day?: string;
  calories: number;
}

interface ExerciseEffortProps {
  data: EffortDay[];
}

export default function ExerciseEffort({ data }: ExerciseEffortProps) {
  return (
    <Card style={{ marginBottom: 12, borderRadius: 16 }}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <p style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>
          Exercise Effort
        </p>
        <Text type="secondary" style={{ fontSize: 11, fontWeight: 600 }}>
          KCAL/DAY
        </Text>
      </Flex>
      <Column
        data={data}
        xField="day"
        yField="calories"
        height={180}
        style={{ fill: "#2563eb", radius: 4 }}
        axis={{
          y: { grid: { lineWidth: 0.5, stroke: "#f0f0f0" } },
          x: { tick: false },
        }}
      />
    </Card>
  );
}
