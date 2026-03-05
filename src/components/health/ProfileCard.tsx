import { Card, Flex, Progress, Typography, Tag, Divider } from "antd";
import { getBmiColor, getBmiLabel } from "./constants";

const { Text } = Typography;

interface ProfileCardProps {
  user: {
    name: string;
    age: number;
    weight: number;
    height: number;
    goalWeight: number;
  };
  health: {
    bmi?: number | string;
    summary: { status: string };
    timeline?: { progressPercentage?: number; estimatedWeeks?: number };
  };
}

export default function ProfileCard({ user, health }: ProfileCardProps) {
  const bmi =
    health.bmi ||
    (user.weight / ((user.height / 100) * (user.height / 100))).toFixed(1);

  const bmiNum = parseFloat(bmi.toString()) || 0;
  const bmiPercent = Math.min(100, Math.round((bmiNum / 40) * 100));
  const bmiColor = getBmiColor(bmiNum);

  const progressPct = health.timeline?.progressPercentage || 0;
  const totalWeeks = health.timeline?.estimatedWeeks || 0;

  return (
    <Card style={{ marginBottom: 12, borderRadius: 16 }}>
      <Flex gap={16} align="center">
        {/* BMI circle */}
        <Progress
          type="circle"
          percent={bmiPercent}
          size={90}
          strokeWidth={8}
          strokeColor={bmiColor}
          railColor="#e0e7ff"
          format={() => (
            <div style={{ textAlign: "center", lineHeight: 1.2 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{bmi}</div>
              <div
                style={{
                  fontSize: 9,
                  color: "#888",
                  fontWeight: 600,
                  letterSpacing: 0.5,
                }}
              >
                BMI
              </div>
              {/* <18.5 Underweight🟡 | 18.5–24.9 Normal🟢 | 25–29.9 Overweight🟠 | 30+ Obese🔴 */}
              <div
                style={{
                  fontSize: 8,
                  color: bmiColor,
                  fontWeight: 700,
                  marginTop: 1,
                }}
              >
                {getBmiLabel(bmiNum)}
              </div>
            </div>
          )}
        />

        {/* User info */}
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>
            {user.name}
          </p>
          <p style={{ margin: "2px 0 8px", fontSize: 12, color: "#888" }}>
            Age: {user.age}&nbsp;•&nbsp;Status:{" "}
            <Tag color="blue" style={{ marginLeft: 2 }}>
              {health?.summary?.status}
            </Tag>
          </p>
          <Flex gap={24}>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 10,
                  color: "#aaa",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Weight
              </p>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>
                {user.weight}{" "}
                <Text
                  type="secondary"
                  style={{ fontSize: 11, fontWeight: 400 }}
                >
                  kg
                </Text>
              </p>
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 10,
                  color: "#aaa",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Goal
              </p>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>
                {user.goalWeight}{" "}
                <Text
                  type="secondary"
                  style={{ fontSize: 11, fontWeight: 400 }}
                >
                  kg
                </Text>
              </p>
            </div>
          </Flex>
        </div>
      </Flex>

      <Divider style={{ margin: "12px 0" }} />

      {/* Journey timeline */}
      <Flex justify="space-between" align="center" style={{ marginBottom: 6 }}>
        <Text
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#aaa",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          Estimated Journey
        </Text>
        <Text style={{ fontSize: 13, fontWeight: 700, color: "#2563eb" }}>
          {totalWeeks} Weeks Total
        </Text>
      </Flex>
      <Progress
        percent={progressPct}
        showInfo={false}
        strokeColor="#2563eb"
        railColor="#e0e7ff"
        size={["100%", 8] as [string | number, number]}
      />
      <Flex justify="space-between" style={{ marginTop: 4 }}>
        <Text type="secondary" style={{ fontSize: 11 }}>
          Progress Started
        </Text>
        <Text type="secondary" style={{ fontSize: 11 }}>
          {progressPct}% Complete
        </Text>
      </Flex>
    </Card>
  );
}
