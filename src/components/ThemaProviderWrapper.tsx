"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "GeistSans, sans-serif",
  },
});

export default function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary-color",
      theme.palette.primary.main,
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      theme.palette.secondary.main,
    );
    document.documentElement.style.setProperty(
      "--error-color",
      theme.palette.error.main,
    );
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
