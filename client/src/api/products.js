import Axios from "../config/axios";
import { HOST } from "../config/variable";

export const getProducts = async () => {
    try {
        const response = await Axios.get(`${HOST}/products/get-all`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addProducts = async (product_id, product_name, quantity, unit, price) => {
    try {
        const response = await Axios.post(`${HOST}/products/add-product`, {product_id, product_name, quantity, unit, price});
        return response.data;
    } catch (error) {
        console.error("There was an error adding the product!", error);
        throw error;
    }
};

export const delProducts = async (product_id) => {
    try {
        const response = await Axios.post(`${HOST}/products/delete-by-id`, {product_id});
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateProducts = async (product_id, product_name, quantity, unit, price) => {
    try {
        const response = await Axios.post(`${HOST}/products/update-by-id/${product_id}`, { product_name, quantity, unit, price});
        return response.data;
    } catch (error) {
        console.error("There was an error updating the product!", error);
        throw error;
    }
};

export const getProductById = async (product_id) => {
    try {
        const response = await Axios.get(`${HOST}/products/get-by-id/${product_id}`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the product!", error);
        throw error;
    }
};