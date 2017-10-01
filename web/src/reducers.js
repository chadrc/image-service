import Globals from "./Globals";

import Store from "./Store";

const imageService = (state = {
    loadingImages: false,
    dirInfo: {
        name: null,
        path: null,
        items: []
    }
}, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case "DIRECTORY_RECEIVED":
            newState.loadingImages = false;
            newState.dirInfo = action.dirInfo;
            return newState;
        case "FETCH_DIRECTORY":
            let path = action.path;
            newState.loadingImages = true;
            fetch(`${Globals.ApiUrl}/m/${path}`, {
                method: 'get',
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => response.json())
                .then((data) => {
                    Store.store.dispatch({
                        type: "DIRECTORY_RECEIVED",
                        dirInfo: data
                    })
                });
            return newState;
        case "ADD_DIRECTORY":

            return newState;
        case "UPLOAD_IMAGE":

            return newState;
        default:
            return state;
    }
};

export default {
    imageService: imageService
}