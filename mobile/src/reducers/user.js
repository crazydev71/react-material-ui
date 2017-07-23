const initialState = {
    // user: null
};

export default (state=initialState, action) => {

    switch (action.type) {
        case "SET_USER":
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }

}