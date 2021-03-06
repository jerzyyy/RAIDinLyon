import { GET_POSITION } from './types'

export const getPosition = () => {
    return dispatch => {
        let lat = 0
        let lng = 0
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(displayLocationInfo);
        }
        function displayLocationInfo(position) {
            lng = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(`longitude: ${lng} | latitude: ${lat}`, "FUNCTION DISPLAY LOCATION");
            dispatch({
                type: GET_POSITION,
                payload: [lat, lng],
            })
        }
    }
}

