
const ApiUrl = "http://localhost:8080";
const ImageUrl = ApiUrl + "/i";

function isNullOrUndefined(obj) {
    return obj === null || typeof obj === "undefined";
}

export default {
    ApiUrl: ApiUrl,
    ImageUrl: ImageUrl,
    isNullOrUndefined: isNullOrUndefined
}