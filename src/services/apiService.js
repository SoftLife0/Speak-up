import axios from "axios";
import { userService } from "./userService";

// Use Vite's environment variable system
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: BASE_URL,
        });

        // Interceptor to attach token dynamically
        this.api.interceptors.request.use(
            (config) => {
                const currentUser = userService.getUser();
                const token = currentUser?.token;

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                
                }

                return config;
            },
            (error) => Promise.reject(error)
        );
    }

    // GET request
    async get(endpoint) {
        try {
            const response = await this.api.get(endpoint);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // POST request
    async post(endpoint, data) {
        try {
            const response = await this.api.post(endpoint, data);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // PUT request
    async put(endpoint, data = {}) {
        try {
            const response = await this.api.put(endpoint, data);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // DELETE request
    async delete(endpoint) {
        try {
            const response = await this.api.delete(endpoint);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Handle errors globally
    handleError(error) {
        if (error.response) {
            console.error("API error:", error.response.data);
        } else if (error.request) {
            console.error("No response from server:", error.request);
        } else {
            console.error("Request error:", error.message);
        }
        throw error;
    }
}

const apiService = new ApiService();
export { apiService };
