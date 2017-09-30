
const imageApi = (state = {}, action) => {
    switch (action.type) {
        case "RECEIVED":
            return action.data;
            break;
        default:
            return state;
    }
};

export default {
    imageApi: imageApi
}