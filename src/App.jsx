import { Navigate, Route, Routes, useLocation } from "react-router";
import SiteLayout from "./layouts/SiteLayout.jsx";
import NotFound from "./pages/NotFound.jsx";
import { siteRoutes } from "./routes/routeConfig.js";

// Keep previously shared /page/index.html links working after the conversion.
function LegacyRedirect({ to }) {
  const { search, hash } = useLocation();
  return <Navigate replace to={to + search + hash} />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        {siteRoutes.map(({ path, Component }) =>
          path === "/" ? (
            <Route key={path} index element={<Component />} />
          ) : (
            <Route key={path} path={path} element={<Component />} />
          ),
        )}
        {siteRoutes.map(({ path }) => (
          <Route
            key={path + "index.html"}
            path={path + "index.html"}
            element={<LegacyRedirect to={path} />}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
