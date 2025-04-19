import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import DrugHistory from "./pages/DrugHistory";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
          <div className="flex items-center space-x-2">
            <img src="/masa-logo.png" alt="MASA Logo" className="h-8" />
            <h1 className="text-xl font-bold text-gray-800">MarketAccessNow</h1>
          </div>
          <nav className="space-x-6 text-sm">
            <Link to="/history" className="hover:underline text-blue-600">약가이력 찾기</Link>
            <button className="hover:underline text-blue-600">신제품약가 검토</button>
            <button className="hover:underline text-blue-600">정부정책 검색</button>
          </nav>
        </header>

        <Routes>
          <Route path="/history" element={<DrugHistory />} />
          <Route
            path="/"
            element={
              <main className="text-center py-16">
                <h2 className="text-3xl font-bold mb-4">MarketAccessNow</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Accurate drug pricing information and forecasting for market access professionals.
                </p>
                <img src="/magnifier.png" alt="Magnifier icon" className="mx-auto w-16 h-16 mb-6" />
                <div className="flex justify-center space-x-6 px-4 flex-wrap">
                  <div className="bg-white p-6 rounded-2xl shadow-md w-60 mb-4">
                    <h3 className="text-lg font-semibold mb-2">오늘의 약가 변동</h3>
                    <p className="text-sm text-gray-600">최신 고시 기반 약가 인상 및 인하 품목 확인.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-md w-60 mb-4">
                    <h3 className="text-lg font-semibold mb-2">고시·공시 요약</h3>
                    <p className="text-sm text-gray-600">보건복지부 고시 사항 요약 제공합니다.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-md w-60 mb-4">
                    <h3 className="text-lg font-semibold mb-2">정책 브리핑</h3>
                    <p className="text-sm text-gray-600">제약산업 및 약가 제도의 변화 흐름 정리.</p>
                  </div>
                </div>
              </main>
            }
          />
        </Routes>

        <footer className="text-center text-sm text-gray-500 py-6">
          © 2025 MarketAccessNow. All rights reserved. |{" "}
          <a href="mailto:fursie@naver.com" className="text-blue-600 hover:underline">문의하기</a>
        </footer>
      </div>
    </Router>
  );
}

export default App;
