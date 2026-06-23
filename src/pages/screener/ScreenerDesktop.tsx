import type { MarketTab, UseScreenerReturn } from '../../hooks/useScreener';

const calcDiffFromHigh = (current: number, high: number) =>
  (((current - high) / high) * 100).toFixed(2);

function ScreenerDesktop({
  activeTab,
  setActiveTab,
  results,
  loading,
  error,
  handleRunScreener,
  refetch,
}: UseScreenerReturn) {
  return (
    <div style={styles.container}>
      {/* 탭 */}
      <div style={styles.tabs}>
        {(['US', 'KR'] as MarketTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.tabActive : {}),
            }}
          >
            {tab === 'US' ? '미장' : '국장'}
          </button>
        ))}
      </div>

      {/* 헤더 */}
      <div style={styles.header}>
        <h2 style={styles.title}>
          {activeTab === 'US' ? '미장' : '국장'} 스크리너 (52주 신고가 + 20일선 10% 이내)
        </h2>
        <button onClick={handleRunScreener} disabled={loading} style={styles.button}>
          {loading ? '조회 중...' : '스크리너 실행'}
        </button>
      </div>

      {/* 상태별 분기: 로딩 / 에러 / 결과없음 / 목록 (상호배타) */}
      {loading ? (
        <p style={styles.loading}>불러오는 중...</p>
      ) : error ? (
        <div style={styles.errorBox}>
          <p style={styles.error}>{error}</p>
          <button onClick={refetch} style={styles.retryBtn}>
            다시 시도
          </button>
        </div>
      ) : results.length === 0 ? (
        <p style={styles.empty}>
          조건에 맞는 종목이 없습니다. (장 마감이거나 조건을 충족한 종목이 없습니다)
        </p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th>티커</th>
              <th>종목명</th>
              <th>시장</th>
              <th>현재가</th>
              <th>52주 신고가</th>
              <th>신고가 대비(%)</th>
              <th>20일선</th>
              <th>20일선 대비(%)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={`${r.ticker}-${i}`} style={styles.row}>
                <td style={styles.ticker}>{r.ticker}</td>
                <td>{r.name}</td>
                <td>{r.market}</td>
                <td>${r.currentPrice.toFixed(2)}</td>
                <td>${r.high52Week.toFixed(2)}</td>
                <td style={{ color: '#ff1744' }}>
                  {calcDiffFromHigh(r.currentPrice, r.high52Week)}%
                </td>
                <td>${r.ma20.toFixed(2)}</td>
                <td style={{ color: r.ma20Diff >= 0 ? '#00c853' : '#ff1744' }}>
                  {r.ma20Diff.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { padding: '24px' },
  tabs: { display: 'flex', gap: '8px', marginBottom: '16px' },
  tab: {
    padding: '8px 20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    background: 'white',
    cursor: 'pointer',
    fontSize: '14px',
  },
  tabActive: {
    background: '#1a1a2e',
    color: 'white',
    border: '1px solid #1a1a2e',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  title: { margin: 0, fontSize: '18px' },
  button: {
    padding: '8px 16px',
    backgroundColor: '#1a1a2e',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  loading: { color: '#888' },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    background: '#fff0f1',
    border: '1px solid #ffd0d4',
    borderRadius: '8px',
  },
  error: { color: '#ff1744', margin: 0 },
  retryBtn: {
    padding: '6px 14px',
    border: '1px solid #ff1744',
    borderRadius: '4px',
    background: 'white',
    color: '#ff1744',
    cursor: 'pointer',
  },
  empty: { color: '#888' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'center' },
  thead: { backgroundColor: '#f5f5f5' },
  row: { borderBottom: '1px solid #eee' },
  ticker: { fontWeight: 'bold' },
};

export default ScreenerDesktop;
