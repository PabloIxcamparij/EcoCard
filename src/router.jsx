import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import IndexPage from "./views/Menu";

const PlaceGame = lazy(() => import("./views/PlaceGame"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<IndexPage />} index />

        <Route
          path="/placeGame"
          element={
            <Suspense fallback="Cargando ...">
              <PlaceGame />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
