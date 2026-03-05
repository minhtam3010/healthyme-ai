import { Button, Card, Flex, Typography } from "antd";

const { Text } = Typography;

interface ExerciseDay {
  day: string;
  activity: string;
  duration: string;
  caloriesBurned?: string;
}

interface WeeklyExerciseProps {
  exerciseCalendar: ExerciseDay[];
  /** Lifted state — controlled by Health.tsx so useExportPDF can force-expand */
  showAll: boolean;
  setShowAll: (v: boolean) => void;
}

function ExerciseDayCard({ e, i }: { e: ExerciseDay; i: number }) {
  return (
    <div
      style={{
        border: i === 0 ? "2px solid #2563eb" : "1.5px solid #e5e7eb",
        borderRadius: 14,
        padding: "12px 10px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        background: "#fff",
      }}
    >
      <Text type="secondary" style={{ fontSize: 11, fontWeight: 600 }}>
        {e.day}
      </Text>
      <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>{e.activity}</p>
      <Flex align="center" gap={4}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#2563eb",
            display: "inline-block",
            flexShrink: 0,
          }}
        />
        <Text type="secondary" style={{ fontSize: 11 }}>
          {e.duration}
        </Text>
      </Flex>
    </div>
  );
}

export default function WeeklyExercise({
  exerciseCalendar,
  showAll,
  setShowAll,
}: WeeklyExerciseProps) {
  // Group into row pairs for PDF row-aware page breaking
  const rows: ExerciseDay[][] = [];
  for (let i = 0; i < exerciseCalendar.length; i += 2) {
    rows.push(exerciseCalendar.slice(i, i + 2));
  }

  return (
    <Card style={{ marginBottom: 12, borderRadius: 16 }}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <p style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>
          Weekly Exercise
        </p>
        <Button
          type="link"
          style={{ padding: 0, fontSize: 13, height: "auto" }}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View All"}
        </Button>
      </Flex>

      {showAll ? (
        // Row-grouped grid — each row tagged with data-pdf-row so the PDF
        // exporter snaps page breaks between rows, never mid-row
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              data-pdf-row="exercise"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              {row.map((e, colIdx) => (
                <ExerciseDayCard key={colIdx} e={e} i={rowIdx * 2 + colIdx} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        // Horizontal scroll — flexWrap:nowrap prevents cards wrapping to new lines
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            flexWrap: "nowrap",
            gap: 12,
            paddingBottom: 4,
          }}
        >
          {exerciseCalendar.map((e, i) => (
            <div
              key={i}
              style={{
                minWidth: 130,
                maxWidth: 130,
                flexShrink: 0,
                border: i === 0 ? "2px solid #2563eb" : "1.5px solid #e5e7eb",
                borderRadius: 14,
                padding: "12px 10px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                background: "#fff",
              }}
            >
              <Text type="secondary" style={{ fontSize: 11, fontWeight: 600 }}>
                {e.day}
              </Text>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>
                {e.activity}
              </p>
              <Flex align="center" gap={4}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#2563eb",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {e.duration}
                </Text>
              </Flex>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
