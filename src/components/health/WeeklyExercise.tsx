import { Card, Typography, Table, Grid } from "antd";
import type { ColumnsType } from "antd/es/table";

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface ExerciseDay {
  day: string;
  activity: string;
  duration: string;
  caloriesBurned?: string;
}

interface WeeklyExerciseProps {
  exerciseCalendar: ExerciseDay[];
}

export default function WeeklyExercise({
  exerciseCalendar,
}: WeeklyExerciseProps) {
  const screens = useBreakpoint();
  const isMobile = !screens.sm;

  const columns: ColumnsType<ExerciseDay> = [
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
      width: 60,
      render: (text) => (
        <Text
          type="secondary"
          style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
      render: (text, record) => (
        <div>
          <Text style={{ fontSize: 13, fontWeight: 700 }}>{text}</Text>
          {isMobile && (
            <div style={{ marginTop: 2 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {record.duration}
              </Text>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      responsive: ["sm"],
      render: (text) => (
        <Text type="secondary" style={{ fontSize: 12 }}>
          {text}
        </Text>
      ),
    },
  ];

  return (
    <Card
      style={{ marginBottom: 12, borderRadius: 16 }}
      bodyStyle={{ padding: 16 }}
    >
      <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 700 }}>
        Exercise Calendar
      </p>
      <Card data-pdf-row="exercise" bodyStyle={{ padding: 0 }}>
        <Table<ExerciseDay>
          dataSource={exerciseCalendar}
          columns={columns}
          pagination={false}
          rowKey="day"
          size="small"
        />
      </Card>
    </Card>
  );
}
