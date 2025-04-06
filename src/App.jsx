import React from "react";

function App() {
  const openNewTab = (path) => {
    window.open(path, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <div className="flex items-center space-x-3">
          <img src="/masa-logo.png" alt="MASA Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold text-gray-800">MarketAccessNow</span>
        </div>

        <div className="space-x-6">
          <button onClick={() => openNewTab("/history")} className="hover:text-blue-600">약가이력 찾기</button>
          <button onClick={() => openNewTab("/review")} className="hover:text-blue-600">신제품약가 검토</button>
          <button onClick={() => openNewTab("/policy")} className="hover:text-blue-600">정부정책 검색</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center mt-16">
        <h1 className="text-4xl font-bold mb-4">MarketAccessNow</h1>
        <p className="text-lg text-center max-w-xl mb-8">
          Accurate drug pricing information and forecasting for market access professionals.
        </p>
        <img src="/magnifier.png" alt="Magnifying glass with info lines" className="h-24 w-24 mb-8" />
        <div className="flex space-x-6">
          <div className="bg-white shadow p-6 rounded-2xl text-center w-60">
            <h2 className="text-lg font-bold mb-2">오늘의 약가 변동</h2>
            <p className="text-sm text-gray-600">최신 고시 기반 약가 인상 및 인하 품목 확인.</p>
          </div>
          <div className="bg-white shadow p-6 rounded-2xl text-center w-60">
            <h2 className="text-lg font-bold mb-2">고시·공시 요약</h2>
            <p className="text-sm text-gray-600">보건복지부 고시 사항을 빠르고 직관적으로 요약 제공합니다.</p>
          </div>
          <div className="bg-white shadow p-6 rounded-2xl text-center w-60">
            <h2 className="text-lg font-bold mb-2">정책 브리핑</h2>
            <p className="text-sm text-gray-600">제약산업 및 약가 제도의 변화 흐름을 정리해드립니다.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-20 mb-6 text-sm text-gray-500">
        © 2025 MarketAccessNow. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
