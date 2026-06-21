import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { ThemeProvider } from "./providers/theme.provider.tsx";
import { router } from "./routes/index.tsx";

import { Provider as ReduxProvider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "./redux/store.ts";
import { I18nProvider } from "./components/I18n/I18Provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <ReduxProvider store={store}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster richColors />
        </ThemeProvider>
      </ReduxProvider>
    </I18nProvider>
  </StrictMode>,
);
