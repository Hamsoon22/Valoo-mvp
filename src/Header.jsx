// src/Header.jsx
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

function Header({ title = "", setMenuOpen }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1rem 1.2rem', borderBottom: '1px solid #ddd',
      position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 100,
      maxWidth: '500px', width: '100%', margin: '0 auto', boxSizing: 'border-box'
    }}>
      <div style={{ width: '32px' }}></div>
      <div style={{
        fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center', flex: 1
      }}>
        {title}
      </div>
      <IconButton size="small" onClick={() => setMenuOpen(true)}>
        <MenuIcon />
      </IconButton>
    </div>
  );
}

export default Header;
