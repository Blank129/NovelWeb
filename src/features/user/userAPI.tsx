import apiAxiosInstance from '../../services/axios';



export const fetchUserData = async (userId: any) => {
  try {
    const response = await apiAxiosInstance.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
