// 백엔드 StockResponseDto 대응
export interface Stock {
  id: number;
  ticker: string;
  name: string;
  market: string;
  marketDescription: string;
}

// 백엔드 ScreenerResponseDto 대응
export interface ScreenerResult {
  ticker: string;
  name: string;
  market: string;
  currentPrice: number;
  high52Week: number;
  ma20: number;
  ma20Diff: number;
  screenerDate: string;
}

// 백엔드 ApiResponse 공통 응답 대응
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}