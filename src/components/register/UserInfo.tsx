import { Flex, Input, InputNumber, Select } from "antd";
import { useState, useEffect } from "react";
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
  const dispatch = useDispatch();
  const [notCompleteFields, setNotCompleteFields] = useState<
    { id: string; message: string }[]
  >([]);

  useEffect(() => {
    if (disabledAnalyzeBtn) {
      const fields = checkFields(user);
      setNotCompleteFields(fields);
    } else if (!disabledAnalyzeBtn && notCompleteFields?.length > 0) {
      setNotCompleteFields([]);
    }
  }, [disabledAnalyzeBtn, user]);

  useEffect(() => {
    if (notCompleteFields?.length === 0 && disabledAnalyzeBtn) {
      setDisabledAnalyzeBtn(false);
    }
  }, [notCompleteFields]);

  return (
    <div>
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
