import axios from "axios";

const API_URL = "http://localhost:8000/basic/";

// Fungsi untuk mengambil semua buku
export const getAllBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error mengambil data:", error);
    throw error;
  }
};

// Fungsi untuk menambah buku baru
export const createBook = async (bookData) => {
  try {
    const response = await axios.post(API_URL, bookData);
    return response.data;
  } catch (error) {
    console.error("Error menambah buku:", error);
    throw error;
  }
};

// Fungsi untuk update buku
export const updateBook = async (id, bookData) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, bookData);
    return response.data;
  } catch (error) {
    console.error("Error update buku:", error);
    throw error;
  }
};

// Fungsi untuk hapus buku
export const deleteBook = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
  } catch (error) {
    console.error("Error hapus buku:", error);
    throw error;
  }
};
