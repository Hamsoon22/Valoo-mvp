import React from "react";
import { Drawer, IconButton, List, ListItem, ListItemText, Divider, Typography, ListItemButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import valooLogo from "./assets/valoo_logo.png";

const menuItems = [
  {
    section: "전체 과정",
    items: [
      { text: "정보 입력", path: "/modeselection" },
      { text: "내 삶 방향찾기", path: "/valueintro" },
      { text: "일기 쓰기", path: "/journal/write" },
      { text: "만약에 질문", path: "/magicwand" },
      { text: "앞으로의 행동 추천", path: "/actionadvice" },
      { text: "리마인드 글&이미지", path: "/reminderintro" }
    ]
  },
  {
    section: "기타",
    items: [
      { text: "약관", path: "/consent" },
      { text: "라이센스", path: "/license" },
      { text: "개발정보", path: "/devinfo" }
    ]
  }
];

function HamburgerMenu({ open, onClose, navigate }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ width: 280, padding: "1.5rem", display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Top logo and close */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <img src={valooLogo} alt="valoo" style={{ height: 28 }} />
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        {/* Menu sections */}
        {menuItems.map(({ section, items }, i) => (
          <div key={i}>
            <Typography variant="body2" sx={{ color: "#0097D8", mb: 1, mt: i === 0 ? 0 : 2 }}>{section}</Typography>
            <List>
              {items.map(({ text, path }) => (
                <ListItemButton key={text} onClick={() => { navigate(path); onClose(); }}>
                  <ListItemText primary={<Typography fontWeight="bold">{text}</Typography>} />
                  <ChevronRightIcon fontSize="small" />
                </ListItemButton>
              ))}
            </List>
            {i === 0 && <Divider sx={{ my: 1 }} />}
          </div>
        ))}
      </div>
    </Drawer>
  );
}

export default HamburgerMenu;
