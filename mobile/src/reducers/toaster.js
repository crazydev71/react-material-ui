const initialState = {
    open: false,
    message: '',
    duration: 3000,
    status: 'success'
};

export default (state=initialState, action) => {
  switch (action.type) {
      case 'TOASTER_SHOW':
        console.log(action.payload);
        return Object.assign({}, state, action.payload, {open: true});
      case 'TOASTER_HIDE':
        console.log(action.payload);
        return Object.assign({}, state, {open: false});
      default:
        return state;
  }
}