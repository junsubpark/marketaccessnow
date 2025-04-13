import React, { useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";

function App() {
  useEffect(() => {
    netlifyIdentity.init();
  }, []);

  const handleLogin = () => {
    netlifyIdentity.open(); // 로그인 창 열기
  };

  return (
    <div className="text-center p-6 font-sans">
      {/* 상단 메뉴 */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <div className="flex items-center gap-2">
          <img src="/masa-logo.png" alt="MASA Logo" className="h-8" />
          <h1 className="text-xl font-bold">MarketAccessNow</h1>
        </div>
        <div className="space-x-6 text-sm">
          <a href="#" className="hover:underline">약가이력 찾기</a>
          <a href="#" className="hover:underline">신제품약가 검토</a>
          <a href="#" className="hover:underline">정부정책 검색</a>
          <button
            onClick={handleLogin}
            className="ml-4 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
          >
            로그인 / 회원가입
          </button>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <main className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-2">MarketAccessNow</h2>
        <p className="text-gray-600 mb-6">
          Accurate drug pricing information and forecasting for market access professionals.
        </p>
        <img src="/magnifier.png" alt="Magnifier icon" className="mx-auto w-16 h-16 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-white rounded-xl shadow">
            <h3 className="font-bold mb-2">오늘의 약가 변동</h3>
            <p className="text-sm text-gray-600">최신 고시 기반 약가 인상 및 인하 품목 확인.</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow">
            <h3 className="font-bold mb-2">고시·공시 요약</h3>
            <p className="text-sm text-gray-600">보건복지부 고시 사항을 빠르고 직관적으로 요약 제공합니다.</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow">
            <h3 className="font-bold mb-2">정책 브리핑</h3>
            <p className="text-sm text-gray-600">제약산업 및 약가 제도의 변화 흐름을 정리해드립니다.</p>
          </div>
        </div>
        <p className="text-xs mt-12 text-gray-400">
          © 2025 MarketAccessNow. All rights reserved. | <a href="mailto:fursie@naver.com" className="underline">문의하기</a>
        </p>
      </main>
    </div>
  );
}

export default App;
