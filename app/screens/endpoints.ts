export class API {
  static BASE_URL = "https://api.escuelajs.co/api/v1";

  static PRODUCTS_URL = `${API.BASE_URL}/products`; // to add product
  static PRODUCT_LIST = (limit: number, offset: number) =>
    `${API.PRODUCTS_URL}?limit=${limit}&offset=${offset}`; // to get all products with all categories

  static USER = {
    LOGIN: `${API.BASE_URL}/auth/login`, // to get the token
    GET_USER_DETAILS: `${API.BASE_URL}/auth/profile`, // to get user details (admin/customer)
  };

  static CATEGORY = {
    GET_CATEGORIES: (limit: number) =>
      `${API.BASE_URL}/categories?limit${limit}`, // to get all categories
    GET_PRODUCTS_BY_CAT: (categoryId: number, limit: number, offset: number) =>
      `${API.BASE_URL}/categories/${categoryId}/products?limit=${limit}&offset=${offset}`, // to get product by category
  };
}
