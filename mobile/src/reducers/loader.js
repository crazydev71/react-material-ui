const initialState = {
    isLoading: false
};

export default (state=initialState, action) => {
    switch (action.type) {
        case 'SET_LOADER':
            return Object.assign({}, state, { isLoading: action.payload });
        default:
            return state;
    }
}