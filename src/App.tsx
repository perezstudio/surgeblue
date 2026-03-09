import { useState, useEffect } from "react";
import "./index.css";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { AppPage } from "./pages/app";

function getRoute() {
  return window.location.pathname;
}

export function App() {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onPopState = () => setRoute(getRoute());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setRoute(path);
  };

  if (route.startsWith("/app")) {
    return <AppPage />;
  }

  switch (route) {
    case "/login":
      return <LoginPage navigate={navigate} />;
    default:
      return <HomePage navigate={navigate} />;
  }
}

export default App;
