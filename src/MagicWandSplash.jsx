// MagicWandSplash.jsx
import React, { useEffect } from "react";
import splashImage from "./assets/magicwandsplash.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function MagicWandSplash() {
  const navigate = useNavigate();
  const location = useLocation();
  const name = location.state?.name || "사용자";
  const worries = location.state?.worries || ["경제적 문제", "배우자·연인"];

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/magicwandescribe", { state: { name, worries } });
    }, 2000);
    return () => clearTimeout(timeout);
  }, [navigate, name, worries]);

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <div
        style={{
          width: "100vw",
          height: "calc(100vh - 64px)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <img
          src={splashImage}
          alt="splash"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain"
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            width: "100%",
            textAlign: "center",
            zIndex: 1
          }}
        >
          <p
            style={{
              color: "#222",
              fontSize: "1.1rem",
              fontWeight: "bold",
              margin: 0
            }}
          >
          </p>
        </div>
      </div>
    </div>
  );
}
