import { Flex } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "#fff",
          width: "100%",
          height: "60px",
          borderBottom: "1px solid #ccc",
          marginBottom: "15px",
        }}
      >
        <Flex
          align="center"
          style={{
            height: "100%",
            margin: "0 15px",
          }}
          justify="space-between"
        >
          <Flex
            align="center"
            gap={"8px"}
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src="/logo.png"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
              }}
            />
            <p
              style={{
                fontSize: "21px",
                color: "#2b8a3e",
                fontWeight: "bold",
              }}
            >
              WellBuddy
            </p>
          </Flex>

          <p
            style={{
              fontSize: "20px",
              color: "gray",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            Members
          </p>
        </Flex>
      </div>

      <div id="main-content-container" style={{ padding: "15px", zoom: "1.5" }}>
        <Outlet />
      </div>
    </div>
  );
}
