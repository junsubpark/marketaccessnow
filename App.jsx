import React from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <header className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">MarketAccessNow</h1>
        <p className="text-lg max-w-xl mx-auto">
          Accurate drug pricing information and forecasting for market access professionals.
        </p>
      </header>

      <section className="flex justify-center mb-12">
        <img
          src="/magnifier-example.png"
          alt="Magnifying glass with info lines"
          className="w-72 h-auto shadow-md rounded-xl"
        />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="rounded-2xl shadow-sm bg-white p-6">
          <h2 className="text-xl font-semibold mb-2">오늘의 약가 변동</h2>
          <p className="text-sm text-gray-600">
            최신 고시 기반 약가 인상 및 인하 품목 확인.
          </p>
        </div>
        <div className="rounded-2xl shadow-sm bg-white p-6">
          <h2 className="text-xl font-semibold mb-2">고시·공시 요약</h2>
          <p className="text-sm text-gray-600">
            보건복지부 고시 사항을 빠르고 직관적으로 요약 제공합니다.
          </p>
        </div>
        <div className="rounded-2xl shadow-sm bg-white p-6">
          <h2 className="text-xl font-semibold mb-2">정책 브리핑</h2>
          <p className="text-sm text-gray-600">
            제약산업 및 약가 제도의 변화 흐름을 정리해드립니다.
          </p>
        </div>
      </section>

      <footer className="mt-16 text-center text-sm text-gray-500">
        © 2025 MarketAccessNow. All rights reserved.
      </footer>
    </div>
  );
}
