import { ThemeProvider } from "@/components/theme-provider";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import { Bug, Docs, Faq, Feature, Home, Login } from "./pages";

/**
 * Top-level application component that provides theme context and client-side routing.
 *
 * @returns The root JSX element: a ThemeProvider wrapping route definitions (a "/login" route and nested routes under "/").
 */
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="docs" element={<Docs />} />
          <Route path="bug" element={<Bug />} />
          <Route path="feature" element={<Feature />} />
          <Route path="faq" element={<Faq />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;