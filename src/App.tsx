import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Toaster } from "sonner";
import { Box, getBlocksCSSVariables, themeConfig } from "./blocks";
import { AppView, ContentLayout, useDarkMode } from "./common";
import { Login } from "./authentication";
import { useState } from "react";
import { Dashboard } from "./dashboard";

const GlobalStyle = createGlobalStyle`
  :root{
    /* Font Family */
      --font-family: 'FK Grotesk Neu';

    /* New blocks theme css variables*/
  
    ${(props) => {
      // @ts-expect-error
      return getBlocksCSSVariables(props.theme.blocksTheme);
    }}
  }
`;

function App() {
  const { isDarkMode } = useDarkMode();

  const [view, setAppView] = useState<AppView>("login");

  return (
    <ThemeProvider theme={isDarkMode ? themeConfig.dark : themeConfig.light}>
      <GlobalStyle />
      <Toaster />
      <Box
        display="flex"
        flexDirection="column"
        height="100vh"
        backgroundColor="surface-secondary"
      >
        <ContentLayout>
          {view === "login" ? (
            <Login handleSetActiveView={() => setAppView("dashboard")} />
          ) : (
            <Dashboard />
          )}
        </ContentLayout>
      </Box>
    </ThemeProvider>
  );
}

export default App;
