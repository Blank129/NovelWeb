import apiAxios from '../../services/axios';



export const fetchUserData = async (userId: any) => {
  try {
    const response = await apiAxios.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
