import axios from "axios";

export const getProducts = async (
  pageSize: number,
  currentPage: number,
  brand: string | null
) => {
  try {
    const response = await axios.post("http://localhost:8080/products", {
      keyword: "",
      page_size: pageSize,
      page_number: currentPage,
      brand: brand || "",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const createProduct = async (productData: any) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/product",
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
