import { Card, Flex, Divider, Typography } from "antd";
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

function getBodyValue(parts: BodyPart[], key: string): string {
  const found = parts.find((b) => b.type?.toLowerCase().includes(key));
  return found ? String(found.value) : "—";
}

/** Thin colour-coded stacked proportion bar */
function ProportionBar({
  items,
}: {
  items: { color: string; flex: number }[];
}) {
  return (
    <div
      style={{
        display: "flex",
        borderRadius: 8,
        overflow: "hidden",
        height: 8,
        marginBottom: 14,
      }}
    >
      {items.map((seg, i) => (
        <div
          key={i}
          style={{
            flex: seg.flex,
            background: seg.color,
            minWidth: seg.flex > 0 ? 2 : 0,
          }}
        />
      ))}
    </div>
  );
}

/** Single metric tile with label, value, percentage badge, and mini progress bar */
function MetricTile({
  label,
  value,
  unit,
  pct,
  color,
}: {
  label: string;
  value: string;
  unit: string;
  pct: number;
  color: string;
}) {
  return (
    <div
      style={{
        borderRadius: 12,
        padding: "12px 14px",
        background: "#f8fafc",
        borderLeft: `4px solid ${color}`,
      }}
    >
      <Flex justify="space-between" align="center" style={{ marginBottom: 4 }}>
        <Text
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#aaa",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {label}
        </Text>
        <Text style={{ fontSize: 10, fontWeight: 700, color }}>{pct}%</Text>
      </Flex>
      <p style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800 }}>
        {value}
        <Text
          type="secondary"
          style={{ fontSize: 11, fontWeight: 400, marginLeft: 3 }}
        >
          {unit}
        </Text>
      </p>
      <div style={{ height: 4, borderRadius: 4, background: "#e5e7eb" }}>
        <div
          style={{
            height: "100%",
            borderRadius: 4,
            background: color,
            width: `${pct}%`,
          }}
        />
      </div>
    </div>
  );
}

export default function BodyComposition({
  bodyParts,
  activityData,
}: BodyCompositionProps) {
  const rawVals = BODY_ITEMS.map(
    (b) => parseFloat(getBodyValue(bodyParts, b.key)) || 0,
  );
  const bodyTotal = rawVals.reduce((s, v) => s + v, 0) || 1;

  return (
    <Card style={{ marginBottom: 12, borderRadius: 16 }}>
      <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 700 }}>
        Body Composition
      </p>

      <ProportionBar
        items={BODY_ITEMS.map((b, i) => ({
          color: b.color,
          flex: rawVals[i] / bodyTotal,
        }))}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {BODY_ITEMS.map((item, i) => (
          <MetricTile
            key={item.key}
            label={item.label}
            value={getBodyValue(bodyParts, item.key)}
            unit="kg"
            pct={Math.round((rawVals[i] / bodyTotal) * 100)}
            color={item.color}
          />
        ))}
      </div>

      {activityData.length > 0 && (
        <>
          <Divider style={{ margin: "16px 0" }} />
          <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 700 }}>
            Activity Composition
          </p>

          <ProportionBar
            items={activityData.map((a, i) => ({
              color: ACTIVITY_COLORS[i % ACTIVITY_COLORS.length],
              flex: a.percentage,
            }))}
          />

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            {activityData.map((a, i) => {
              const color = ACTIVITY_COLORS[i % ACTIVITY_COLORS.length];
              return (
                <div
                  key={i}
                  style={{
                    borderRadius: 12,
                    padding: "12px 14px",
                    background: "#f8fafc",
                    borderLeft: `4px solid ${color}`,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#aaa",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    {a.name}
                  </Text>
                  <p
                    style={{
                      margin: "0 0 8px",
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#111",
                    }}
                  >
                    {a.percentage}%
                  </p>
                  <div
                    style={{
                      height: 4,
                      borderRadius: 4,
                      background: "#e5e7eb",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        borderRadius: 4,
                        background: color,
                        width: `${a.percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </Card>
  );
}
