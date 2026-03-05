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
import { useNavigate } from "react-router-dom";

export default function Health() {
  const user = useSelector((state: RootState) => state.user.data);
  const health = useSelector((state: RootState) => state.health.data);

  const navigate = useNavigate();

  const [showAll, setShowAll] = useState(false);
  const { containerRef, handleExportPDF } = useExportPDF(setShowAll, showAll);

  const macroBreakdown =
    health.nutrition?.macroBreakdown?.map((m) => ({
      type: m.type,
      value: m.valueInGrams,
    })) || [];

  const exerciseEffortData =
    health.exerciseCalendar?.map((e) => ({
      day: e.day?.slice(0, 3),
      calories: parseInt(e.caloriesBurned) || 0,
    })) || [];

  const bodyParts = health.compositions?.[0]?.body || [];

  const activityData =
    health.compositions?.[0]?.activity?.map((a) => ({
      name: a.type,
      percentage: parseFloat(a.value) || 0,
    })) || [];

  useEffect(() => {
    if (!health || !health.summary || (user.id ?? "") === "") {
      navigate("/");
    }
  }, [health]);

  return (
    <div
      style={{
        maxWidth: 430,
        margin: "0 auto",
        paddingBottom: 24,
      }}
    >
      {/* Header */}
      <div style={{ background: "#fff", padding: "0px 20px 16px" }}>
        <Flex justify="space-between" align="center">
          <p style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
            Your Health
          </p>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleExportPDF}
            size="small"
          >
            Export PDF
          </Button>
        </Flex>
      </div>

      {/* Captured area — everything inside here is rendered into the PDF */}
      <div ref={containerRef} style={{ padding: "12px 12px 0" }}>
        <ProfileCard user={user} health={health} />

        <WeeklyExercise
          exerciseCalendar={health.exerciseCalendar || []}
          showAll={showAll}
          setShowAll={setShowAll}
        />

        <NutritionInsights
          dailyCalories={health.nutrition?.dailyCalories}
          macroBreakdown={macroBreakdown}
          focus={health.nutrition?.dietaryRecommendations?.focus}
        />

        <ExerciseEffort data={exerciseEffortData} />

        <BodyComposition bodyParts={bodyParts} activityData={activityData} />
      </div>
    </div>
  );
}
