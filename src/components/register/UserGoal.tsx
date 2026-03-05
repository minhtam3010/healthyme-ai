import { useDispatch, useSelector } from "react-redux";
import { defaultAction, COLORS, BORDER_COLORS } from "../../constant/user";
import { saveUser } from "../../hooks/redux/user";
import type { RootState } from "../../hooks/redux/store";

const UserGoal = ({ isMobile }: { isMobile: boolean }) => {
  const dispatch = useDispatch();
  const user = useSelector((root: RootState) => root.user.data);

  return (
    <div
      style={{
        maxWidth: "440px",
      }}
    >
      <p
        style={{
          textAlign: "center",
          fontStyle: "italic",
          color: "gray",
          fontSize: "13px",
        }}
      >
        Select your primary goal
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "10px",
          padding: "10px 20px",
        }}
      >
        {defaultAction.map((a, i) => {
          return (
            <div
              key={a}
              style={{
                flex: isMobile ? "1 1 300px" : undefined,
                width:
                  !isMobile && i === defaultAction?.length - 1
                    ? "320px"
                    : "150px",
                borderRadius: "12px",
                padding: "5px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                background: COLORS[i],
                border: `2px solid ${BORDER_COLORS[i]}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderBottom = `8px solid ${BORDER_COLORS[i]}`;
                e.currentTarget.style.borderRight = `6px solid ${BORDER_COLORS[i]}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderRight = `2px solid ${BORDER_COLORS[i]}`;
                e.currentTarget.style.borderBottom = `2px solid ${BORDER_COLORS[i]}`;
              }}
              onClick={() => {
                dispatch(saveUser({ ...user, goal: a }));
              }}
            >
              <p
                style={{
                  color: "white",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                {a}
              </p>
              <img
                src={`/${a?.toLowerCase()?.split(" ")?.join("-")}.jpg`}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserGoal;
