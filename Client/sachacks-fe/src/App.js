import React from "react";
import { BrowserRouter } from "react-router-dom";
import ClientRouter from "./ClientRouter";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes/theme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ClientRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
