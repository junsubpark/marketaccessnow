import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DrugPriceHistory from "./pages/DrugPriceHistory";
import DrugPricePredict from "./pages/DrugPricePredict";

function App() {
  return (
    <Router>
      <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-700">
          MarketAccessNow 홈으로
        </Link>
        <div className="space-x-4 text-sm">
          <Link to="/DrugPriceHistory" className="text-gray-800 hover:underline">
            약가이력 찾기
          </Link>
          <Link to="/DrugPricePredict" className="text-gray-800 hover:underline">
            신제품약가 검토
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<div className="p-6 text-center">📊 환영합니다! 약가 정보 검색 시스템입니다.</div>} />
        <Route path="/DrugPriceHistory" element={<DrugPriceHistory />} />
        <Route path="/DrugPricePredict" element={<DrugPricePredict />} />
      </Routes>
    </Router>
  );
}

export default App;
