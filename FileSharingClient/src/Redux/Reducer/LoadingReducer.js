export const OpenLoading = () => {
  return {
    type: "OPEN_LOADING",
  };
};
export const CloseLoading = (type, payload) => {
  return {
    type: "CLOSE_LOADING",
  };
};
export const updateIsTab = (payload) => {
  return {
    type: "UPDATE_IS_TAB",
    payload: payload,
  };
};
const LoadingReducer = (
  state = {
    openLoading: false,
    isTab: true,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case "OPEN_LOADING":
      return {
        ...state,
        openLoading: true,
      };
    case "CLOSE_LOADING":
      return {
        ...state,
        openLoading: false,
      };
    case "UPDATE_IS_TAB": {
      return {
        ...state,
        isTab: payload,
      };
    }
    default:
      return state;
  }
};
export default LoadingReducer;
