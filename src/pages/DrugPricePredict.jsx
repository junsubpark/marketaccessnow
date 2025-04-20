import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './DrugPricePredict.css';

function DrugPricePredict() {
  const [fileName, setFileName] = useState('');
  const [ingredientCode, setIngredientCode] = useState('');
  const [data, setData] = useState(null);
  const [options, setOptions] = useState({
    isDelegate: false,
    isRare: false,
    isException: false,
    isBiologic: false
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked
    }));
  };

  const handleSubmit = () => {
    if (!data || !ingredientCode) {
      alert('파일과 주성분코드를 입력하세요.');
      return;
    }

    const filtered = data.filter(row => row['주성분코드']?.toString() === ingredientCode);

    if (filtered.length === 0) {
      alert('해당 주성분코드에 대한 데이터가 없습니다.');
      return;
    }

    const prices = filtered.map(row => parseFloat(row['상한금액'])).filter(price => !isNaN(price));

    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);

    let estimated = maxPrice;
    if (options.isDelegate) estimated *= 0.9;
    if (options.isRare) estimated *= 0.93;
    if (options.isException) estimated *= 0.85;
    if (options.isBiologic) estimated *= 0.95;

    setData({
      주성분코드: ingredientCode,
      품목수: filtered.length,
      최고가: maxPrice,
      최저가: minPrice,
      예측가: Math.round(estimated)
    });
  };

  return (
    <div className="drug-price-container">
      <div className="intro-box">
        <h2>📊 신제품 약가 산정 시스템</h2>
        <p><strong>[절차]</strong><br />
          1) 최신 약제급여목록표 다운로드 ▶ 2) 최신 급여목록표 업로드 ▶ 3) 예측할 제품의 주성분코드 입력 ▶ 4) 결과확인
        </p>
        <p><strong>[주요확인 내용]</strong><br />
          1) 주성분코드가 동일한 동일제제 개발시 약가 검토<br />
          2) 제2호가목 해당되는 산정 예측 가능<br />
          &nbsp;&nbsp;- 제2호가목(1), (2), (3) 검토<br />
          &nbsp;&nbsp;- 위임형, 퇴방/희귀/산소 등 특수사항 적용<br />
          &nbsp;&nbsp;- 단독등재 품목의 예외 산정 적용가능 (제2호가(1)(바) 적용 가능)<br />
          &nbsp;&nbsp;- 생물의약품 여부 적용하여 산정 가능
        </p>
        <p>
          <strong>[심평원 약제급여목록표 확인]</strong>:{" "}
          <a
            href="https://www.hira.or.kr/bbsDummy.do?pgmid=HIRAA030014050000"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'blue', textDecoration: 'underline' }}
          >
            바로가기 링크
          </a>
        </p>
      </div>

      <div>
        <label><strong>📂 파일 선택</strong></label><br />
        <input type="file" accept=".xlsx" onChange={handleFileUpload} />
        {fileName && <p>✅ 업로드된 파일: {fileName}</p>}
      </div>

      <input
        type="text"
        placeholder="예: 241803ATB"
        value={ingredientCode}
        onChange={(e) => setIngredientCode(e.target.value)}
        style={{ marginTop: '10px', padding: '6px', width: '200px' }}
      />

      <div className="checkbox-group">
        <label><input type="checkbox" name="isDelegate" onChange={handleCheckboxChange} /> 위임형 후발의약품인가요?</label><br />
        <label><input type="checkbox" name="isRare" onChange={handleCheckboxChange} /> 퇴장방지의약품 / 희귀의약품 / 산소인가요?</label><br />
        <label><input type="checkbox" name="isException" onChange={handleCheckboxChange} /> 제2호가목(1)(바)에 해당하나요?</label><br />
        <label><input type="checkbox" name="isBiologic" onChange={handleCheckboxChange} /> 생물의약품인가요?</label>
      </div>

      <button onClick={handleSubmit}>📌 약가 산정 결과 보기</button>

      {data && data.예측가 && (
        <div className="result-box">
          <p>📌 <strong>주성분코드:</strong> {data.주성분코드}</p>
          <p><strong>총 품목 수:</strong> {data.품목수}</p>
          <p><strong>최고가:</strong> {data.최고가.toLocaleString()}원</p>
          <p><strong>최저가:</strong> {data.최저가.toLocaleString()}원</p>
          <p><strong>예측가:</strong> {data.예측가.toLocaleString()}원</p>
        </div>
      )}
    </div>
  );
}

export default DrugPricePredict;
