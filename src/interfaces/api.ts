export interface ApiResponse {
    success: boolean;
    message: string;
    count?: number;
    payload?: any;
    data?: any;
};

export interface IUseHookResponse {
  isLoading: boolean;
  data: any;
  message: string;
  success: boolean;
  refetch?: (query?: string) => Promise<void>;
}