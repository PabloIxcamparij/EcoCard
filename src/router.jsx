import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import IndexPage from "./views/Menu";

const ViewGame = lazy(() => import("./views/ViewGame"));
const ViewRules = lazy(() => import("./views/ViewRules"));
const ViewScore = lazy(() => import("./views/ViewScore"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} index />

        <Route
          path="/viewGame"
          element={
            <Suspense fallback="Cargando ...">
              <ViewGame />
            </Suspense>
          }
        />

        <Route
          path="/viewRules"
          element={
            <Suspense fallback="Cargando ...">
              <ViewRules />
            </Suspense>
          }
        />

        <Route
          path="/viewScore"
          element={
            <Suspense fallback="Cargando ...">
              <ViewScore />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
