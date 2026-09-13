export interface ApiResponse<T = null> {
     success: true;
     message: string;
     data: T;
}
