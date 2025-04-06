import React from "react";

export default function App() {
  const menuItems = [
    { name: "약가이력 찾기", link: "./price-history.html" },
    { name: "신제품약가 검토", link: "./new-product.html" },
    { name: "정부정책 검색", link: "./policy-search.html" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* 상단 메뉴바 */}
      <header className="flex items-center justify-between px-6 py-4 shadow bg-white">
        <h1 className="text-xl font-bold">MarketAccessNow</h1>
        <nav className="space-x-4">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </header>

      {/* 메인 영역 */}
      <main className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h2 className="text-4xl font-bold mb-6">MarketAccessNow</h2>
        <p className="mb-10 text-lg">
          Accurate drug pricing information and forecasting for market access professionals.
        </p>
        {/* 돋보기 이미지 */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149852.png"
          alt="돋보기 이미지"
          className="w-24 h-24 mb-12"
        />

        {/* 기존 버튼 영역 (예시) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold mb-2">오늘의 약가 변동</h3>
            <p>최신 고시 기반 약가 인상 및 인하 품목 확인.</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold mb-2">고시·공시 요약</h3>
            <p>보건복지부 고시 사항을 빠르고 직관적으로 요약 제공합니다.</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold mb-2">정책 브리핑</h3>
            <p>제약산업 및 약가 제도의 변화 흐름을 정리해드립니다.</p>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="text-center text-sm text-gray-500 py-6">
        © 2025 MarketAccessNow. All rights reserved.
      </footer>
    </div>
  );
}
