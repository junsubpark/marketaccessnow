import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function DrugPriceHistory() {
  const [result, setResult] = useState(null);
  const [code, setCode] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const parseDate = (dateStr) => {
    if (!dateStr || dateStr.length !== 8) return '';
    return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6)}`;
  };

  const calculateChangeRate = (oldPrice, newPrice) => {
    if (!oldPrice || oldPrice === 0) return null;
    return (((newPrice - oldPrice) / oldPrice) * 100).toFixed(2);
  };

  const formatCurrency = (val) => Number(val).toLocaleString();

  const handleFile = async (e) => {
    const f = e.target.files[0];
    setFile(f);
  };

  const handleProcess = async () => {
    if (!file || !code) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);

    // 1. 주성분코드 필터링 + 상한가 0 제외
    let filtered = json.filter(row => row.주성분코드?.toString().includes(code) && row.상한가 > 0);

    // 2. 중복 적용개시일 제거 (가장 첫 행 유지)
    const seenDates = new Set();
    const deduped = filtered.filter(row => {
      const key = row.적용개시일자;
      if (seenDates.has(key)) return false;
      seenDates.add(key);
      return true;
    });

    // 3. 동일 상한가면 가장 빠른 날짜만 남김
    const finalFiltered = [];
    let lastPrice = null;
    deduped.sort((a, b) => a.적용개시일자 - b.적용개시일자);
    deduped.forEach(row => {
      if (row.상한가 !== lastPrice) {
        finalFiltered.push(row);
        lastPrice = row.상한가;
      }
    });

    // 4. 약가 변화율 계산 (과거 → 현재 기준, 이후 역순으로 보여줄 것)
    const rows = [...finalFiltered];
    const resultRows = rows.map((row, idx) => {
      const prev = rows[idx - 1];
      const prevPrice = prev ? prev.상한가 : null;
      const rate = prevPrice !== null ? calculateChangeRate(prevPrice, row.상한가) : null;
      return {
        ...row,
        적용개시일자: parseDate(row.적용개시일자?.toString()),
        약가변화율: rate ? `${rate > 0 ? '+' : ''}${rate}%` : null,
      };
    }).reverse(); // 최신일자부터 보여주기 위해 역순

    // 5. 해설 삽입 (2012-04-01이 존재할 경우 2007-01-01 기준 약가 계산)
    const 해설행 = resultRows.find(r => r.적용개시일자 === '2012-04-01');
    if (해설행) {
      const 기준일 = '20070101';
      const 기준약가row = [...finalFiltered]
        .filter(r => r.적용개시일자 < 기준일 && r.상한가 > 0)
        .sort((a, b) => b.적용개시일자 - a.적용개시일자)[0];

      if (기준약가row) {
        const 기준약가 = 기준약가row.상한가;
        const 적용약가 = Math.round(기준약가 * 0.5355);
        해설행.해설 = `2007.01.01 기준 약가 ${formatCurrency(기준약가)}원 → 53.55% 약가 ${formatCurrency(적용약가)}원`;
      }
    }

    const first = rows[rows.length - 1];
    setResult({
      코드: code,
      제품코드: first.품목기준코드,
      제품명: first.제품명,
      업체명: first.업소명,
      이력: resultRows,
    });
  };

  return (
    <div style={{ padding: 30 }}>
      <div onClick={() => navigate('/')} style={{ fontSize: 24, fontWeight: 'bold', cursor: 'pointer', marginBottom: 20 }}>
        🔙 marketaccessnow 홈으로
      </div>

      <h3>📌 약가 이력 조회 시스템</h3>
      <p>특정품목의 약가이력을 찾습니다.</p>
      <div style={{ lineHeight: '1.6' }}>
        <strong>[절차]</strong><br />
        1) 심평원 약가이력 엑셀 다운로드 ▶ 2) 해당파일 업로드 ▶ 3) 엑셀파일내 찾고싶은 품목 주성분코드 입력 ▶ 4) 결과확인<br /><br />
        <strong>[주요확인 내용]</strong><br />
        1) 복합제 산정시 기준약가<br />
        2) 2012년 4월 1일 일괄인하 여부 (2007년 1월 1일 기준 53.55% 적용 약가인지 여부)<br />
        3) 재평가로 20% 인하 적용여부 (3년에 걸쳐 7%-7%-6% 인하 적용 확인)<br />
        4) 사용량-약가 연동협상으로 인한 약가인하 확인<br />
        5) 실거래가 약가인하 확인<br /><br />
        📎{' '}
        <a
          href="https://www.hira.or.kr/ra/medi/getHistoryList.do?pgmid=HIRAA030035020000&WT.gnb=%EC%9D%98%EC%95%BD%ED%92%88%ED%86%B5%ED%95%A9%EC%A0%95%EB%B3%B4"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'blue', textDecoration: 'underline' }}
        >
          심평원 의약품통합정보 '급여 이력정보 검색' 바로가기
        </a>
      </div>

      <hr />
      <br />

      <input type="file" onChange={handleFile} />
      <br /><br />
      <input
        placeholder="주성분코드 입력 (예: 125002ATB)"
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <button onClick={handleProcess}>조회</button>

      {result && (
        <>
          <br /><br />
          <div>
            <p>1. 제품코드: {result.제품코드}</p>
            <p>2. 제품명: {result.제품명}</p>
            <p>3. 업체명: {result.업체명}</p>
            <p>4. 주성분코드: {result.코드}</p>
            <p>5. 급여이력 ⬇⬇⬇</p>
          </div>

          <table border="0" cellPadding="8" style={{ borderCollapse: 'collapse', marginTop: 10 }}>
            <thead>
              <tr style={{ fontWeight: 'bold' }}>
                <td>적용개시일자</td>
                <td>상한가</td>
                <td>약가변화율</td>
                <td>해설</td>
              </tr>
            </thead>
            <tbody>
              {result.이력.map((r, i) => (
                <tr key={i}>
                  <td>{r.적용개시일자}</td>
                  <td>{formatCurrency(r.상한가)}</td>
                  <td style={{ color: r.약가변화율?.includes('-') ? 'red' : 'blue' }}>{r.약가변화율}</td>
                  <td style={{ color: 'red' }}>{r.해설}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {result.이력.length > 1 && (
            <div style={{ marginTop: '50px' }}>
              <h4>📉 약가 추이</h4>
              <Line
                data={{
                  labels: result.이력.map(row => row.적용개시일자).reverse(),
                  datasets: [
                    {
                      label: '상한가 (원)',
                      data: result.이력.map(row => row.상한가).reverse(),
                      borderColor: 'dodgerblue',
                      backgroundColor: 'white',
                      tension: 0.3,
                      fill: false,
                      pointRadius: 4,
                      pointHoverRadius: 6,
                    },
                  ],
                }}
                options={{
                  scales: {
                    y: { title: { display: true, text: '상한가 (원)' } },
                    x: { title: { display: true, text: '적용 개시일자' } },
                  },
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: (context) =>
                          `${result.이력[result.이력.length - 1 - context.dataIndex].적용개시일자} : ${context.parsed.y.toLocaleString()} 원`,
                      },
                    },
                  },
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default DrugPriceHistory;
