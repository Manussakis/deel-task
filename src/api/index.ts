import { API_BASE_URL } from '../utils/constants';

export const fetchData = async (searchTerm: string) => {
  const response = await fetch(`${API_BASE_URL}${searchTerm}`);
  const data = response.json();

  return data;
}
