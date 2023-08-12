import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Loginpage from "./Loginpage";
import Homepage from "./Homepage";
import Registerpage from "./Registerpage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: false,
      cacheTime: false,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <header>
          <Link to="/">
            <h1 className="text-2xl underline font-semibold">
              pern.restAPI - React Client👆
            </h1>
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
