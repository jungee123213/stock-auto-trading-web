import axios from 'axios';
import type { ApiResponse, ScreenerResult } from '../types/screener';

const BASE_URL = 'http://localhost:8080';

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

// 스크리너 실행
export const runScreener = async (market: string): Promise<void> => {
  await axios.post(`${BASE_URL}/api/screener/run/${market}`);
};