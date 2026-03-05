import { Flex } from "antd";
import { Outlet } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "#fff",
          width: "100%",
          height: "40px",
          borderBottom: "1px solid #ccc",
          marginBottom: "10px",
        }}
      >
        <Flex
          align="center"
          style={{
            height: "100%",
            margin: "0 10px",
          }}
        >
          <Flex align="center" gap={"5px"}>
            <img
              src="/logo.png"
              style={{
                width: "25px",
                height: "25px",
                borderRadius: "50%",
              }}
            />
            <p
              style={{
                fontSize: "14px",
                color: "#2b8a3e",
                fontWeight: "bold",
              }}
            >
              WellBuddy
            </p>
          </Flex>
        </Flex>
      </div>

      <div style={{ padding: "10px" }}>
        <Outlet />
      </div>
    </div>
  );
}
