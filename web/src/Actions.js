
const fetchDirInfoAction = (path) => {
    return {
        type: "FETCH_DIRECTORY",
        path: path
    };
};

export {
    fetchDirInfoAction
}