import type { MarketTab, UseScreenerReturn } from '../../hooks/useScreener';
import './ScreenerMobile.css';

const calcDiffFromHigh = (current: number, high: number) =>
  (((current - high) / high) * 100).toFixed(2);

function ScreenerMobile({
  activeTab,
  setActiveTab,
  results,
  loading,
  error,
  handleRunScreener,
  refetch,
}: UseScreenerReturn) {
  return (
    <div className="m-screener">
      {/* 탭 */}
      <div className="m-tabs">
        {(['US', 'KR'] as MarketTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`m-tab ${activeTab === tab ? 'm-tab--active' : ''}`}
          >
            {tab === 'US' ? '미장' : '국장'}
          </button>
        ))}
      </div>

      <h2 className="m-title">
        {activeTab === 'US' ? '미장' : '국장'} 스크리너
      </h2>
      <p className="m-subtitle">52주 신고가 + 20일선 10% 이내</p>

      {/* 실행 버튼 (풀폭) */}
      <button
        className="m-run-btn"
        onClick={handleRunScreener}
        disabled={loading}
      >
        {loading ? '조회 중...' : '스크리너 실행'}
      </button>

      {/* 상태별 분기: 로딩 / 에러 / 결과없음 / 목록 (상호배타) */}
      {loading ? (
        <p className="m-loading">불러오는 중...</p>
      ) : error ? (
        <div className="m-error-box">
          <p className="m-error">{error}</p>
          <button className="m-retry-btn" onClick={refetch}>
            다시 시도
          </button>
        </div>
      ) : results.length === 0 ? (
        <p className="m-empty">
          조건에 맞는 종목이 없습니다.
          <br />
          (장 마감이거나 조건을 충족한 종목이 없습니다)
        </p>
      ) : (
        <ul className="m-list">
          {results.map((r, i) => {
            const highDiff = calcDiffFromHigh(r.currentPrice, r.high52Week);
            return (
              <li className="m-card" key={`${r.ticker}-${i}`}>
                <div className="m-card__top">
                  <div className="m-card__name">
                    <span className="m-card__ticker">{r.ticker}</span>
                    <span className="m-card__company">{r.name}</span>
                  </div>
                  <span className="m-badge">{r.market}</span>
                </div>

                <div className="m-card__price">${r.currentPrice.toFixed(2)}</div>

                <div className="m-card__metrics">
                  <div className="m-metric">
                    <span className="m-metric__label">신고가 대비</span>
                    <span className="m-metric__value m-neg">{highDiff}%</span>
                  </div>
                  <div className="m-metric">
                    <span className="m-metric__label">20일선 대비</span>
                    <span
                      className={`m-metric__value ${
                        r.ma20Diff >= 0 ? 'm-pos' : 'm-neg'
                      }`}
                    >
                      {r.ma20Diff.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ScreenerMobile;
