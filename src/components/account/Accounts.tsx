import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../hooks/redux/store";
import { useState } from "react";
import { deleteUser, saveUser } from "../../hooks/redux/user";
import { saveHealth } from "../../hooks/redux/health";
import { useNavigate } from "react-router-dom";

const BG_COLORS = [
  "fce4d6",
  "f9d0b4",
  "f5c5a3",
  "fde8d8",
  "ffd5dc",
  "ffdfbf",
  "fff0e0",
  "fde8c8",
];

function getAvatarUrl(name: string): string {
  const seed = encodeURIComponent(name);
  const hash = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const bg = BG_COLORS[hash % BG_COLORS.length];
  return `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${seed}&backgroundColor=${bg}&radius=14&size=110`;
}

export default function Accounts({
  onAddProfile,
}: {
  onAddProfile?: () => void;
}) {
  const dispatch = useDispatch();
  const users = useSelector((root: RootState) => root.users.data);
  const [hovered, setHovered] = useState<string | null>(null);
  const [addHovered, setAddHovered] = useState(false);

  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(28px, 5vw, 28px)",
          fontWeight: 700,
          color: "#111",
          marginBottom: "20px",
          letterSpacing: -0.5,
        }}
      >
        Select your Profile
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 32,
          justifyContent: "center",
        }}
      >
        {users.map((user) => {
          const isHovered = hovered === user.id;
          const avatarUrl = getAvatarUrl(user.name);
          const nameSplit = user?.name?.split(" ");

          return (
            <div
              key={user.id}
              onMouseEnter={() => setHovered(user.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
                cursor: "pointer",
                transition: "transform 0.15s ease",
                transform: isHovered ? "scale(1.07)" : "scale(1)",
              }}
              onClick={() => {
                dispatch(saveUser(user));
                dispatch(saveHealth(user?.health));
                navigate("/health");
              }}
            >
              {/* Avatar wrapper — relative for delete overlay */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: 14,
                    overflow: "hidden",
                    boxShadow: isHovered
                      ? "0 8px 30px rgba(0,0,0,0.20)"
                      : "0 2px 10px rgba(0,0,0,0.10)",
                    border: isHovered
                      ? "3px solid #667eea"
                      : "3px solid transparent",
                    transition: "box-shadow 0.15s ease, border 0.15s ease",
                  }}
                >
                  <img
                    src={avatarUrl}
                    alt={user.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "block",
                    }}
                  />
                </div>

                {/* Delete overlay */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(deleteUser(user));
                  }}
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "rgba(220,38,38,0.85)",
                    border: "none",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 700,
                    lineHeight: 1,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "scale(1)" : "scale(0.7)",
                    transition: "opacity 0.15s ease, transform 0.15s ease",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                  }}
                  title="Remove profile"
                >
                  ✕
                </button>
              </div>

              {/* Name */}
              <p
                style={{
                  margin: 0,
                  fontSize: 15,
                  fontWeight: 600,
                  color: isHovered ? "#111" : "#555",
                  transition: "color 0.15s ease",
                  letterSpacing: 0.2,
                }}
              >
                {nameSplit?.[nameSplit?.length - 1]}
              </p>

              {/* Goal badge */}
              <span
                style={{
                  marginTop: -8,
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#4f8ef7",
                  background: "#e8f0fe",
                  padding: "3px 10px",
                  borderRadius: 20,
                  letterSpacing: 0.3,
                }}
              >
                {user.goal}
              </span>
            </div>
          );
        })}

        {/* Add Profile tile */}
        <div
          onMouseEnter={() => setAddHovered(true)}
          onMouseLeave={() => setAddHovered(false)}
          onClick={onAddProfile}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            cursor: "pointer",
            transition: "transform 0.15s ease",
            transform: addHovered ? "scale(1.07)" : "scale(1)",
          }}
        >
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: 14,
              background: addHovered ? "#f0f0f0" : "#fafafa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              color: addHovered ? "#333" : "#bbb",
              border: `2px dashed ${addHovered ? "#999" : "#ddd"}`,
              boxShadow: addHovered
                ? "0 8px 30px rgba(0,0,0,0.10)"
                : "0 2px 10px rgba(0,0,0,0.04)",
              transition: "all 0.15s ease",
            }}
          >
            +
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 15,
              fontWeight: 600,
              color: addHovered ? "#111" : "#aaa",
              transition: "color 0.15s ease",
              letterSpacing: 0.2,
            }}
          >
            Add Profile
          </p>
        </div>
      </div>
    </div>
  );
}
