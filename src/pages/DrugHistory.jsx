// src/pages/DrugHistory.jsx
import React from "react";
import DrugHistoryTool from "../components/DrugHistoryTool";

function DrugHistory() {
  return (
    <div className="px-8 py-10 text-gray-800">
      <h1 className="text-2xl font-bold mb-6">특정 품목의 약가이력을 찾습니다.</h1>
      <div className="bg-white shadow p-6 rounded-lg mb-10">
        <h2 className="text-xl font-semibold mb-2">[절차]</h2>
        <ol className="list-decimal pl-5 space-y-1 text-sm">
          <li>심평원 약가이력 엑셀 <span className="text-blue-600 underline cursor-pointer">download</span></li>
          <li>해당 파일 업로드</li>
          <li>엑셀 파일 내 찾고 싶은 품목 주성분코드 입력</li>
          <li>결과 확인</li>
        </ol>
        <h2 className="text-xl font-semibold mt-6 mb-2">[주요확인 내용]</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>복합제 사정시 기준약가</li>
          <li>2012년 4월 1일 일괄인하 여부</li>
          <li>재평가로 20% 인하 적용 여부</li>
          <li>사용량-약가 연동협상 인하 확인</li>
          <li>실거래가 인하 확인</li>
        </ul>
        <div className="mt-4 text-sm text-blue-600 underline">
          <a
            href="https://www.hira.or.kr/ra/medi/getHistoryList.do?pgmid=HIRAA030035020000&WT.gnb=%EC%9D%98%EC%95%BD%ED%92%88%ED%92%88%ED%88%AC"
            target="_blank"
            rel="noopener noreferrer"
          >
            심평원 의약품통합정보 ‘급여 이력정보 검색’ 링크 바로가기
          </a>
        </div>
      </div>

      {/* 여기 아래에 GUI 프로그램 연동할 영역 */}
      <DrugHistoryTool />
    </div>
  );
}

export default DrugHistory;
