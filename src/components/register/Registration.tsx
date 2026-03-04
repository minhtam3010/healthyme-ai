import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../hooks/redux/store";
import { saveUser } from "../../hooks/redux/user";
import type { User } from "../../interface/user";
import { Button, Flex } from "antd";
import UserGoal from "./UserGoal";
import UserInfo from "./UserInfo";
import ExerciseCommitment from "./ExerciseCommitment";
import { checkFields } from "../../helper/helper";

export default function Registration() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 420);
  const [step, setStep] = useState<"goal" | "exercise" | "info">("goal");
  const [disabledAnalyzeBtn, setDisabledAnalyzeBtn] = useState(false);
  const [loadingAnalyzeBtn, setLoadingAnalyzeBtn] = useState(false);

  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch();

  function handleReset() {
    dispatch(
      saveUser({ goal: user.goal, day2Exercise: user?.day2Exercise } as User),
    );
    setDisabledAnalyzeBtn(false);
  }

  function handleBack() {
    dispatch(
      saveUser({
        ...user,
        goal: user?.day2Exercise === 0 ? "" : user?.goal,
        day2Exercise: 0,
      }),
    );
  }

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 420);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if ((user?.goal ?? "") === "") {
      setStep("goal");
    } else if ((user?.day2Exercise ?? 0) > 0) {
      setStep("info");
    } else {
      setStep("exercise");
    }
  }, [user]);

  return (
    <div>
      <p
        style={{
          fontWeight: "bold",
          fontSize: "22px",
          textAlign: "center",
        }}
      >
        Build your profile
      </p>

      {step === "goal" ? (
        <UserGoal isMobile={isMobile} />
      ) : (
        <div>
          {step === "info" ? (
            <UserInfo
              disabledAnalyzeBtn={disabledAnalyzeBtn}
              setDisabledAnalyzeBtn={setDisabledAnalyzeBtn}
            />
          ) : (
            <ExerciseCommitment />
          )}
          <Flex justify="space-between">
            <Button
              variant="link"
              color="default"
              style={{
                padding: 0,
              }}
              onClick={handleBack}
            >
              <Flex align="center">
                <img
                  src="https://img.icons8.com/?size=100&id=84994&format=png&color=000000"
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
                <p
                  style={{
                    fontSize: "12px",
                  }}
                >
                  Back
                </p>
              </Flex>
            </Button>

            {step === "info" && (
              <Flex align="center" gap={"10px"}>
                <Button
                  variant="link"
                  color="default"
                  style={{
                    padding: 0,
                  }}
                  onClick={handleReset}
                >
                  <p
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    Reset
                  </p>
                </Button>
                <Button
                  color="primary"
                  variant="solid"
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                  }}
                  size="small"
                  onClick={() => {
                    setDisabledAnalyzeBtn(true);
                    const fields = checkFields(user);
                    if (fields?.length === 0) {
                      setLoadingAnalyzeBtn(true);
                    }
                  }}
                  disabled={disabledAnalyzeBtn}
                  loading={loadingAnalyzeBtn}
                >
                  <Flex align="center" gap={"3px"}>
                    {!loadingAnalyzeBtn && (
                      <img
                        src="https://img.icons8.com/?size=100&id=T1daBn7EyQ15&format=png&color=000000"
                        style={{
                          width: "15px",
                          height: "15px",
                        }}
                      />
                    )}
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Analyze
                    </p>
                  </Flex>
                </Button>
              </Flex>
            )}
          </Flex>
        </div>
      )}
    </div>
  );
}
