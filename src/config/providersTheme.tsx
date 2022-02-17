import { darkTheme, lightTheme } from "@styles/theme.styles";
import { ThemeProvider } from "styled-components";
import useDarkMode from "use-dark-mode";
import React from "react";

const ProvidersTheme = ({ children }: { children: React.ReactNode }) => {
  const { value } = useDarkMode(false, { storageKey: null, onChange: null });
  const theme = value ? darkTheme : lightTheme;

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const body = <ThemeProvider theme={theme}>{children}</ThemeProvider>;

  // prevents ssr flash for mismatched dark mode
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{body}</div>;
  }

  return body;
};

export default ProvidersTheme;
