import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-center font-sans">
      {/* 상단 바 */}
      <header className="bg-white shadow flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <img
            src="/masa-logo.png"
            alt="MASA Logo"
            className="h-8 w-auto mr-3"
          />
          <span className="text-xl font-bold text-gray-800">MarketAccessNow</span>
        </div>
        <nav className="space-x-6 text-sm font-semibold text-blue-600">
          <a href="#" className="hover:underline">
            약가이력 찾기
          </a>
          <a href="#" className="hover:underline">
            신제품약가 검토
          </a>
          <a href="#" className="hover:underline">
            정부정책 검색
          </a>
        </nav>
      </header>

      {/* 본문 */}
      <main className="py-16 px-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          MarketAccessNow
        </h1>
        <p className="text-gray-600 mb-10">
          Accurate drug pricing information and forecasting for market access professionals.
        </p>
        <img
          src="/magnifier.png"
          alt="Magnifier icon"
          className="mx-auto w-16 h-16 mb-6"
        />
        <div className="flex justify-center gap-6 flex-wrap">
          <div className="bg-white p-6 rounded-2xl shadow-md w-60">
            <h2 className="text-lg font-bold text-gray-800 mb-2">오늘의 약가 변동</h2>
            <p className="text-sm text-gray-600">
              최신 고시 기반 약가 인상 및 인하 품목 확인.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md w-60">
            <h2 className="text-lg font-bold text-gray-800 mb-2">고시·공시 요약</h2>
            <p className="text-sm text-gray-600">
              보건복지부 고시 사항을 빠르고 직관적으로 요약 제공합니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md w-60">
            <h2 className="text-lg font-bold text-gray-800 mb-2">정책 브리핑</h2>
            <p className="text-sm text-gray-600">
              제약산업 및 약가 제도의 변화 흐름을 정리해드립니다.
            </p>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="text-sm text-gray-500 mt-16 pb-6">
        <p>&copy; 2025 MarketAccessNow. All rights reserved.</p>
        <p>
          문의:{" "}
          <a
            href="mailto:fursie@naver.com"
            className="text-blue-600 hover:underline"
          >
            fursie@naver.com
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
