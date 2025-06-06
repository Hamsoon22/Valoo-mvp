// src/Header.jsx
import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MenuIcon from "@mui/icons-material/Menu";
import "./styles/Header.css";

function Header({ title, onBack, onMenu }) {
  return (
    <div className="common-header">
      {onBack ? (
        <IconButton onClick={onBack}><ArrowBackIosNewIcon /></IconButton>
      ) : (
        <span style={{ width: 40 }} /> // 아이콘 없는 자리 맞춤
      )}
      <div className="common-step-title">{title}</div>
      {onMenu ? (
        <IconButton onClick={onMenu}><MenuIcon /></IconButton>
      ) : (
        <span style={{ width: 40 }} />
      )}
    </div>
  );
}

export default Header;
