export interface Stock {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  primary_exchange: string;
  type: string;
  active: boolean;
  currency_name: string;
  cik?: string;
  composite_figi?: string;
  share_class_figi?: string;
  last_updated_utc?: string;
}

export interface StockApiResponse {
  results: Stock[];
  status: 'OK' | 'ERROR';
  request_id: string;
  count: number;
  next_url?: string;
}

export interface SearchParams {
  search?: string;
  market?: string;
  exchange?: string;
  type?: string;
  active?: boolean;
  sort?: string;
  order?: 'asc' | 'desc';
  limit?: number;
  cursor?: string;
}