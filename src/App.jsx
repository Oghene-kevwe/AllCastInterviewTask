import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SharedLayout } from "./pages/sharedLayout";
import { Homepage } from "./pages/homepage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Homepage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
