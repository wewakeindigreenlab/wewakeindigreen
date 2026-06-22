"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4E2F8E",
    },
    background: {
      default: "#faf8fd",
    },
  },
  typography: {
    fontFamily: "var(--font-cabinet)",
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;
