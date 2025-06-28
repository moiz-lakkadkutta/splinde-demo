import { ApiResponse } from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export class ApiError extends Error {
    constructor(message: string, public status?: number) {
        super(message);
        this.name = 'ApiError';
    }
}

export async function fetchData(): Promise<ApiResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/data`);
        
        if (!response.ok) {
            throw new ApiError(
                `Failed to fetch data: ${response.statusText}`,
                response.status
            );
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError('Failed to connect to the server');
    }
} 