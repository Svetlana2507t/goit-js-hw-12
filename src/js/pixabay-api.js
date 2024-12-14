import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

export const API_KEY = '47332202-20d723453e83dbf57917d8670';

export async function fetchImages(query, per_page = 20, page) {
  const BASE_URL = 'https://pixabay.com/api/';

  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page,
      },
    });
    return response.data;
  } catch (error) {
    //console.log(error.message);
    iziToast.error({
      title: 'Error',
      message: `Error: ${error.message}`,
    });
    //throw error;
  }
}
