import { Flex } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { COMMITMENT } from "../../constant/user";
import { saveUser } from "../../hooks/redux/user";
import type { RootState } from "../../hooks/redux/store";

const ExerciseCommitment = () => {
  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch();

  function handleClick(value: number) {
    dispatch(saveUser({ ...user, day2Exercise: value }));
  }
  return (
    <div>
      <p
        style={{
          textAlign: "center",
          fontStyle: "italic",
          color: "gray",
          marginTop: "3px",
          fontSize: "13px",
        }}
      >
        How many days a week can you exercise?
      </p>
      {COMMITMENT.map((v) => {
        return (
          <div
            style={{
              border: "1px solid #ccc",
              padding: "8px 10px",
              borderRadius: "8px",
              margin: "10px 0",
              cursor: "pointer",
              minWidth: "180px",
              borderRight: `2px solid ${v?.color}`,
              borderBottom: `2px solid ${v?.color}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderBottom = `4px solid ${v?.color}`;
              e.currentTarget.style.borderRight = `3px solid ${v?.color}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderRight = `2px solid ${v?.color}`;
              e.currentTarget.style.borderBottom = `2px solid ${v?.color}`;
            }}
            onClick={() => {
              handleClick(v?.value);
            }}
          >
            <Flex justify="space-between" align="center">
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                {v.label}
              </p>
              <p
                style={{
                  fontSize: "10px",
                  color: "gray",
                }}
              >
                {v.note}
              </p>
            </Flex>
          </div>
        );
      })}
    </div>
  );
};

export default ExerciseCommitment;
