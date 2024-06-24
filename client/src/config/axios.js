import axios from "axios";
import { HOST } from "./variable";

const Axios = axios.create({
    baseURL: HOST,
    withCredentials: true,
});

export default Axios;