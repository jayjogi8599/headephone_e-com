import axios from "axios";

// export const fetchCatagory = async () => {
//   try {
//     const { data } = await axios.get("http://localhost:9000/catagory");

//     return data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// export const fetchProducts = async () => {
//   try {
//     const { data } = await axios.get("http://localhost:9000/product");

//     return data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

export const fetchDataFromApi = async (endpoint) => {
  try {
    const { data } = await axios.get(`http://localhost:9000/${endpoint}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};