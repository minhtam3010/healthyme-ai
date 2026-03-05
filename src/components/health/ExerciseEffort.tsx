import { Card, Flex, Typography, Grid } from "antd";
import { DualAxes } from "@ant-design/plots";

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface ExerciseDay {
  day: string;
  activity: string;
  duration: string;
  caloriesBurned?: string;
}

interface ExerciseEffortProps {
  exerciseCalendar: ExerciseDay[];
}

export default function ExerciseEffort({
  exerciseCalendar,
}: ExerciseEffortProps) {
  const screens = useBreakpoint();
  const isMobile = !screens.sm;

  const data = exerciseCalendar.map((e) => ({
    day: e.day?.slice(0, 3),
    calories: parseInt(e.caloriesBurned || "0") || 0,
    duration: parseInt(e.duration) || 0,
  }));
  return (
    <Card style={{ marginBottom: 12, borderRadius: 16 }}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <p style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>
          Exercise Effort
        </p>
        <Text type="secondary" style={{ fontSize: 11, fontWeight: 600 }}>
          KCAL / MINS
        </Text>
      </Flex>

      {isMobile && (
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: 8, padding: "0 10px" }}
        >
          <Text style={{ fontSize: 11, fontWeight: 700, color: "#2563eb" }}>
            Calories (KCal)
          </Text>
          <Text style={{ fontSize: 11, fontWeight: 700, color: "#52c41a" }}>
            Duration (Mins)
          </Text>
        </Flex>
      )}

      <DualAxes
        xField="day"
        height={180}
        autoFit={true}
        children={[
          {
            data: data,
            type: "interval",
            yField: "calories",
            style: { fill: "#2563eb", radius: 4 },
            axis: {
              y: {
                position: "left",
                title: isMobile ? undefined : "Calories (KCal)",
              },
            },
          },
          {
            data: data,
            type: "line",
            yField: "duration",
            style: { stroke: "#52c41a", lineWidth: 2 },
            shapeField: "smooth",
            axis: {
              y: {
                position: "right",
                title: isMobile ? undefined : "Duration (Mins)",
              },
            },
          },
          {
            data: data,
            type: "point",
            yField: "duration",
            style: { fill: "#52c41a", r: 3 },
            axis: false,
          },
        ]}
        scale={{
          color: { range: ["#2563eb", "#52c41a"] },
        }}
      />
    </Card>
  );
}
