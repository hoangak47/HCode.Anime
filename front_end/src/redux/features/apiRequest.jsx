import { getDataFailure, getDataStart, getDataSuccess } from './homeSlice';

export const getHomeData = async (dispatch, axios) => {
    try {
        dispatch(getDataStart());
        const response = await axios.get('http://localhost:5000/api/home');
        dispatch(getDataSuccess(response.data));
    } catch (error) {
        console.log(error);
        dispatch(getDataFailure());
    }
};
