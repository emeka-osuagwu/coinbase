import axios from "axios";

const API = "https://api.pro.coinbase.com/"

const instance = axios.create({
	baseURL: API
});

export default instance