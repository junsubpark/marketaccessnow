import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-center">
      {/* 상단 메뉴바 */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <div className="flex items-center space-x-2">
          <img src="/masa-logo.png" alt="MASA Logo" className="h-8" />
          <span className="text-xl font-bold">MarketAccessNow</span>
        </div>
        <nav className="space-x-6 text-sm font-medium">
  <button onClick={() => window.open('', '_blank').document.write('<h1>약가이력 찾기</h1>')}>약가이력 찾기</button>
  <button onClick={() => window.open('', '_blank').document.write('<h1>신제품약가 검토</h1>')}>신제품약가 검토</button>
  <button onClick={() => window.open('', '_blank').document.write('<h1>정부정책 검색</h1>')}>정부정책 검색</button>
</nav>
      </header>

      {/* 본문 */}
      <main className="mt-12 px-4">
        <h1 className="text-3xl font-bold mb-2">MarketAccessNow</h1>
        <p className="text-gray-600 mb-6">
          Accurate drug pricing information and forecasting for market access professionals.
        </p>
        <img
          src="/magnifier.png"
          alt="Magnifier icon"
          className="mx-auto w-16 h-16 mb-6"
        />
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <div className="bg-white shadow-md p-4 rounded-xl w-64">
            <h2 className="font-bold text-lg">오늘의 약가 변동</h2>
            <p className="text-sm text-gray-600">
              최신 고시 기반 약가 인상 및 인하 품목 확인.
            </p>
          </div>
          <div className="bg-white shadow-md p-4 rounded-xl w-64">
            <h2 className="font-bold text-lg">고시·공시 요약</h2>
            <p className="text-sm text-gray-600">
              보건복지부 고시 사항을 빠르고 직관적으로 요약 제공합니다.
            </p>
          </div>
          <div className="bg-white shadow-md p-4 rounded-xl w-64">
            <h2 className="font-bold text-lg">정책 브리핑</h2>
            <p className="text-sm text-gray-600">
              제약산업 및 약가 제도의 변화 흐름을 정리해드립니다.
            </p>
          </div>
        </div>
      </main>

      {/* 하단 푸터 */}
      <footer className="mt-12 text-sm text-gray-500 pb-6">
        <p>© 2025 MarketAccessNow. All rights reserved.</p>
        <p>
          문의:{" "}
          <a href="mailto:fursie@naver.com" className="text-blue-500 underline">
            fursie@naver.com
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
