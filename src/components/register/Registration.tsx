import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../hooks/redux/store";
import { pushUsers, saveUser } from "../../hooks/redux/user";
import type { User } from "../../interface/user";
import { Button, Flex } from "antd";
import UserGoal from "./UserGoal";
import UserInfo from "./UserInfo";
import ExerciseCommitment from "./ExerciseCommitment";
import { checkFields } from "../../helper/helper";
import { useGenerateContent } from "../../hooks/llm/llm";
import { saveHealth } from "../../hooks/redux/health";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { setLLMProcess } from "../../hooks/redux/llm";

export default function Registration() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 420);
  const [step, setStep] = useState<"goal" | "exercise" | "info">("goal");
  const [disabledAnalyzeBtn, setDisabledAnalyzeBtn] = useState(false);

  const user = useSelector((state: RootState) => state.user.data);
  const llmProcess = useSelector((state: RootState) => state.llm);
  const dispatch = useDispatch();

  const { generate, healthResponse } = useGenerateContent();

  const navigate = useNavigate();

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

  useEffect(() => {
    if (healthResponse) {
      dispatch(saveHealth(healthResponse));
      const id = uuidv4();
      const finalUser = { ...user, id: id, health: healthResponse } as User;
      dispatch(saveUser(finalUser));
      dispatch(pushUsers(finalUser));
      dispatch(setLLMProcess(false));

      navigate("/health", {
        replace: true,
      });
    }
  }, [healthResponse]);

  useEffect(() => {
    if (llmProcess) {
      generate(JSON.stringify(user));
    }
  }, [llmProcess]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "22px",
            textAlign: "center",
          }}
        >
          Create your Profile
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
                disabled={llmProcess}
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
                    disabled={llmProcess}
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
                        console.log("yes");

                        dispatch(setLLMProcess(true));
                      }
                    }}
                    disabled={disabledAnalyzeBtn}
                    loading={llmProcess}
                  >
                    <Flex align="center" gap={"3px"}>
                      {!llmProcess && (
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

        <div
          style={{
            height: "40px",
          }}
        />
      </div>
    </div>
  );
}
