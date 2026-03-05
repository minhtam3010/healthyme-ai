import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../hooks/redux/store";
import { Button, Flex } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import { useExportPDF } from "./useExportPDF";
import ProfileCard from "./ProfileCard";
import WeeklyExercise from "./WeeklyExercise";
import NutritionInsights from "./NutritionInsights";
import ExerciseEffort from "./ExerciseEffort";
import BodyComposition from "./BodyComposition";
import WeightProgress from "./WeightProgress";
import { useNavigate } from "react-router-dom";

export default function Health() {
  const user = useSelector((state: RootState) => state.user.data);
  const health = useSelector((state: RootState) => state.health.data);

  const navigate = useNavigate();

  const [showAll, setShowAll] = useState(false);
  const { containerRef, handleExportPDF, isExporting } = useExportPDF(
    setShowAll,
    showAll,
  );

  const macroBreakdown =
    health.nutrition?.macroBreakdown?.map((m) => ({
      type: m.type,
      value: m.valueInGrams,
    })) || [];

  const bodyParts = health.compositions?.[0]?.body || [];

  const activityData =
    health.compositions?.[0]?.activity?.map((a) => ({
      name: a.type,
      percentage: parseFloat(a.value) || 0,
    })) || [];

  useEffect(() => {
    if (!health || (user.id ?? "") === "") {
      navigate("/");
    }
  }, [health]);

  if (!health) {
    return null;
  }

  return (
    <div
      style={{
        maxWidth: 430,
        margin: "0 auto",
        paddingBottom: 24,
      }}
    >
      {/* Header */}
      <div style={{ background: "#fff", padding: "0px 10px 5px 10px" }}>
        <Flex justify="space-between" align="center">
          <p style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>
            Your Health
          </p>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleExportPDF}
            size="small"
            loading={isExporting}
          >
            Export PDF
          </Button>
        </Flex>
      </div>

      {/* Captured area — everything inside here is rendered into the PDF */}
      <div ref={containerRef} style={{ padding: "5px 5px 0" }}>
        <ProfileCard user={user} health={health} />

        {health.weightProgress && user.goalWeight && (
          <WeightProgress
            data={health.weightProgress}
            goalWeight={user.goalWeight}
          />
        )}

        <WeeklyExercise exerciseCalendar={health.exerciseCalendar || []} />

        <NutritionInsights
          dailyCalories={health.nutrition?.dailyCalories}
          macroBreakdown={macroBreakdown}
          focus={health.nutrition?.dietaryRecommendations?.focus}
        />

        <ExerciseEffort exerciseCalendar={health.exerciseCalendar || []} />

        <BodyComposition bodyParts={bodyParts} activityData={activityData} />
      </div>
    </div>
  );
}
