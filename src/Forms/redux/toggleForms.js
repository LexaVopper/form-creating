export const initialState = {
  toggleParams: '',
};

export const toggleForms = (state = initialState, action) => {
  if (action.type === 'TOGGLE_FORMS') {
    return {
      ...state,
      toggleParams: action.payload,
    };
  }
  return state;
};

export default toggleForms;
