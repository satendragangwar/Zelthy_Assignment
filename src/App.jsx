import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AvailabilityPage from "./pages/AvailabilityPage";
import SingleAvailability from "./pages/SingleAvailability";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<AvailabilityPage />} />
        <Route path="/:id" element={<SingleAvailability />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default App;
