import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./DrugPricePredict.css";

function DrugPricePredict() {
  const [file, setFile] = useState(null);
  const [drugCode, setDrugCode] = useState("");
  const [results, setResults] = useState(null);
  const [options, setOptions] = useState({
    delegated: false,
    special: false,
    onlyOne: false,
    bio: false,
  });

  const handleCheckboxChange = (e) => {
    setOptions({ ...options, [e.target.name]: e.target.checked });
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleSubmit = () => {
    if (!file || !drugCode) {
      alert("엑셀 파일과 주성분코드를 입력해주세요.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const rows = json.slice(1);
      let startIdx = -1;
      let endIdx = -1;
      let ingredient = "";
      const matchedRows = [];

      rows.forEach((row, idx) => {
        const code = row[3];
        const productCode = row[4];
        const name = row[5];

        if (code === drugCode && !productCode && name) {
          startIdx = idx;
          ingredient += name + " ";
        } else if (code === drugCode && productCode) {
          matchedRows.push(row);
          endIdx = idx;
        }
      });

      const prices = matchedRows.map((r) => parseInt(r[9], 10)).filter(Boolean);
      const productCount = matchedRows.length;
      const max = Math.max(...prices);
      const min = Math.min(...prices);

      const resultData = {
        drugCode,
        ingredient: ingredient || "성분명 정보 없음",
        productCount,
        maxPrice: isFinite(max) ? max : "정보 없음",
        minPrice: isFinite(min) ? min : "정보 없음",
        condition2_2: isFinite(max) ? max : "정보 없음",
        condition2_1: isFinite(max) ? Math.round(max * 0.85) : "정보 없음",
        condition2_0: isFinite(min) ? Math.round(min * 0.85) : "정보 없음",
        condition3: isFinite(min) ? Math.round(Math.min(min, max * 0.7225) * 0.85) : "정보 없음",
      };

      setResults(resultData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="drug-price-container">
      {/* 🏠 홈 링크 */}
      <div style={{ marginBottom: "15px" }}>
        <a href="/" style={{ fontWeight: "bold", fontSize: "18px" }}>← marketaccessnow 홈으로</a>
      </div>

      {/* 📘 설명 문단 */}
      <div className="intro-box">
        <h3>📌 신제품의 약가를 예측합니다.</h3>
        <p><strong>[절차]</strong><br />
        1) 최신 약제급여목록표 다운로드 ▶ 2) 최신 급여목록표 업로드 ▶ 3) 예측할 제품의 주성분코드 입력 ▶ 4) 결과확인</p>
        <p><strong>[주요확인 내용]</strong><br />
        1) 주성분코드가 동일한 동일제제 개발 시 약가 검토<br />
        2) 제2호가목 해당되는 산정 예측 가능<br />
        - 제2호가목(1), (2), (3) 검토<br />
        - 위임형, 퇴방/희귀/산소 등 특수사항 적용 가능<br />
        - 단독등재 품목의 예외 산정 적용 가능 (제2호가(1)(바))<br />
        - 생물의약품 여부 적용 가능</p>
        <p><strong>[심평원 약제급여목록표 확인하기]</strong><br />
        <a href="https://www.hira.or.kr/bbsDummy.do?pgmid=HIRAA030014050000" target="_blank" rel="noopener noreferrer">심평원 링크 바로가기</a></p>
      </div>

      {/* 📁 파일 업로드 */}
      <div style={{ marginBottom: "10px" }}>
        <label><strong>파일 선택:</strong></label>
        <input type="file" accept=".xlsx" onChange={handleFileUpload} />
      </div>

      {/* 🔤 주성분코드 */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={drugCode}
          onChange={(e) => setDrugCode(e.target.value)}
          placeholder="예: 241803ATB"
        />
      </div>

      {/* ✅ 체크박스 옵션 */}
      <div className="checkbox-group">
        <label><input type="checkbox" name="delegated" checked={options.delegated} onChange={handleCheckboxChange} />
          위임형 후발의약품인가요?</label><br />
        <label><input type="checkbox" name="special" checked={options.special} onChange={handleCheckboxChange} />
          퇴방/희귀/산소 의약품인가요?</label><br />
        <label><input type="checkbox" name="onlyOne" checked={options.onlyOne} onChange={handleCheckboxChange} />
          제2호가목(1)(바)에 해당하나요?</label><br />
        <label><input type="checkbox" name="bio" checked={options.bio} onChange={handleCheckboxChange} />
          생물의약품인가요?</label>
      </div>

      {/* 🔘 버튼 */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleSubmit}>📍 약가 산정 결과 보기</button>
      </div>

      {/* 📊 결과 */}
      {results && (
        <div className="result-box">
          <p><strong>주성분코드:</strong> {results.drugCode}</p>
          <p><strong>성분명 및 함량:</strong> {results.ingredient}</p>
          <p><strong>품목 수:</strong> {results.productCount}개</p>
          <p><strong>최고가:</strong> {results.maxPrice}원 / <strong>최저가:</strong> {results.minPrice}원</p>
          <p>✅ 제2호가목(2)(가) - 요건 2개 충족: 💰 {results.condition2_2}원</p>
          <p>✅ 제2호가목(2)(나) - 요건 1개 충족: 💰 {results.condition2_1}원</p>
          <p>✅ 제2호가목(2)(다) - 요건 0개 충족: 💰 {results.condition2_0}원</p>
          <p>🧙‍♂️ 제2호가목(3) - 동일제제 20개 이상 시: 👍 {results.condition3}원</p>
        </div>
      )}
    </div>
  );
}

export default DrugPricePredict;
