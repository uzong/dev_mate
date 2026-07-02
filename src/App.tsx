import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import FavoritesPage from "@/pages/FavoritesPage";
import Home from "@/pages/Home";
import RankingsPage from "@/pages/RankingsPage";
import ResourceDetailPage from "@/pages/ResourceDetailPage";
import ResourcesPage from "@/pages/ResourcesPage";
import SubmitPage from "@/pages/SubmitPage";
import TopicDetailPage from "@/pages/TopicDetailPage";
import TopicsPage from "@/pages/TopicsPage";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:id" element={<ResourceDetailPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics/:id" element={<TopicDetailPage />} />
          <Route path="/rankings" element={<RankingsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/submit" element={<SubmitPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
