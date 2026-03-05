import { Flex, Input, InputNumber, Select } from "antd";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASIC_INFO } from "../../constant/user";
import { saveUser } from "../../hooks/redux/user";
import type { RootState } from "../../hooks/redux/store";
import { checkFields } from "../../helper/helper";

const UserInfo = ({
  disabledAnalyzeBtn,
  setDisabledAnalyzeBtn,
}: {
  disabledAnalyzeBtn: boolean;
  setDisabledAnalyzeBtn: (val: boolean) => void;
}) => {
  const user = useSelector((state: RootState) => state.user.data);
  const llmProcess = useSelector((state: RootState) => state.llm);
  const dispatch = useDispatch();
  const formRef = useRef<HTMLDivElement>(null);
  const [notCompleteFields, setNotCompleteFields] = useState<
    { id: string; message: string }[]
  >([]);

  useEffect(() => {
    if (disabledAnalyzeBtn) {
      const fields = checkFields(user);
      setNotCompleteFields(fields);
    }
  }, [disabledAnalyzeBtn, user]);

  useEffect(() => {
    if (notCompleteFields?.length === 0 && disabledAnalyzeBtn) {
      setDisabledAnalyzeBtn(false);
    }
  }, [notCompleteFields]);

  return (
    <div ref={formRef} style={{ position: "relative" }}>
      {/* Skeleton overlay on top when llmProcess is true */}
      {llmProcess && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            borderRadius: "12px",
            overflow: "hidden",
            background:
              "linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)",
            backgroundSize: "400% 100%",
            animation: "shimmer 1.8s ease-in-out infinite",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              color: "#1677ff",
              fontWeight: 600,
              animation: "aiPulse 1.4s ease-in-out infinite",
              zIndex: 1,
            }}
          >
            <img
              src="https://img.icons8.com/?size=100&id=ETVUfl0Ylh1p&format=png&color=000000"
              style={{
                width: "15px",
                height: "15px",
              }}
            />{" "}
            AI is analyzing...
          </span>
          <style>{`
            @keyframes shimmer {
              0% { background-position: 100% 0; }
              100% { background-position: -100% 0; }
            }
            @keyframes aiPulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.4; }
            }
          `}</style>
        </div>
      )}

      <p
        style={{
          fontSize: "12px",
          margin: "5px 0",
          fontStyle: "italic",
          color: "gray",
        }}
      >
        * Your goal: {user?.goal}
      </p>

      {BASIC_INFO.map((info) => {
        return (
          <Flex gap={"10px"}>
            {info?.map((inf) => {
              const errorMessage = notCompleteFields?.find(
                (v) => v?.id === inf?.id,
              );
              return (
                <div
                  style={{
                    margin: "8px 0",
                    width: "100%",
                  }}
                >
                  <p
                    style={{
                      fontSize: "12px",
                      marginBottom: "5px",
                    }}
                  >
                    {inf?.label}

                    <span
                      style={{
                        color: "red",
                      }}
                    >
                      *
                    </span>
                  </p>
                  {inf.type === "text" && (
                    <Input
                      size="medium"
                      placeholder={inf.placeholder}
                      style={{
                        fontSize: "12px",
                      }}
                      onChange={(e) => {
                        setNotCompleteFields((fields) =>
                          fields?.filter((v) => v?.id !== inf?.id),
                        );
                        dispatch(
                          saveUser({
                            ...user,
                            [inf?.id]: e.currentTarget.value,
                          }),
                        );
                      }}
                      value={(user as any)?.[inf.id] ?? ""}
                    />
                  )}

                  {inf.type === "number" && (
                    <InputNumber
                      size="medium"
                      placeholder={inf.placeholder}
                      style={{
                        fontSize: "12px",
                        width: "120px",
                      }}
                      value={(user as any)?.[inf?.id]}
                      onChange={(e) => {
                        if (
                          inf?.max &&
                          inf?.min &&
                          (e > inf?.max || e < inf?.min || e === null)
                        ) {
                          setNotCompleteFields((res) => {
                            const message =
                              e === null
                                ? "Please input number"
                                : `Allow min: ${inf?.min} & max: ${inf?.max}`;

                            return [
                              ...res?.filter((v) => v?.id !== inf?.id),
                              { id: inf?.id, message: message },
                            ];
                          });
                        } else {
                          setNotCompleteFields((fields) =>
                            fields?.filter((v) => v?.id !== inf?.id),
                          );
                        }
                        dispatch(
                          saveUser({
                            ...user,
                            [inf?.id]: e,
                          }),
                        );
                      }}
                    />
                  )}
                  {inf.type === "select" && (
                    <Select
                      size="medium"
                      options={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                      ]}
                      style={{
                        width: "100%",
                        fontSize: "12px",
                      }}
                      placeholder={inf.placeholder}
                      value={(user as any)?.[inf?.id]}
                      onChange={(e) => {
                        setNotCompleteFields((fields) =>
                          fields?.filter((v) => v?.id !== inf?.id),
                        );
                        dispatch(
                          saveUser({
                            ...user,
                            [inf?.id]: e,
                          }),
                        );
                      }}
                    />
                  )}
                  {errorMessage && (
                    <p
                      style={{
                        fontSize: "10px",
                        color: "red",
                      }}
                    >
                      {errorMessage?.message}
                    </p>
                  )}
                </div>
              );
            })}
          </Flex>
        );
      })}
    </div>
  );
};

export default UserInfo;
