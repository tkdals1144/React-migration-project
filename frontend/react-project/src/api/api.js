// api.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true, // ✅ 모든 요청에 쿠키 포함
});

export default api;
