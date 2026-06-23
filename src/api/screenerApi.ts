import axios from 'axios';
import type { ApiResponse, ScreenerResult } from '../types/screener';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 미장 스크리너 결과 조회
export const getUsScreener = async (): Promise<ScreenerResult[]> => {
  const response = await axios.get<ApiResponse<ScreenerResult[]>>(
    `${BASE_URL}/api/screener/us`
  );
  return response.data.result;
};

// 국장 스크리너 결과 조회
export const getKrScreener = async (): Promise<ScreenerResult[]> => {
  const response = await axios.get<ApiResponse<ScreenerResult[]>>(
    `${BASE_URL}/api/screener/kr`
  );
  return response.data.result;
};

// 스크리너 실행 (US는 백엔드에서 NASDAQ+NYSE 처리)
export const runScreener = async (market: 'US' | 'KR'): Promise<void> => {
  await axios.post(`${BASE_URL}/api/screener/run/${market}`);
};