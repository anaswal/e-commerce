const DEFAULT_STATE = {
  count: 0,
};

export const counterReducer = (state = DEFAULT_STATE, action) => {
  if (action.type === "INCREMENT_COUNTER") {
    const duplicateState = { ...state };
    duplicateState.count += 1;
    return duplicateState;
  } else if (action.type === "DECREMENT_COUNTER") {
    const duplicateState = { ...state };
    duplicateState.count -= 1;
    return duplicateState;
  } else if (action.type === "SET_COUNT") {
    const duplicateState = { ...state };
    duplicateState.count = action.payload;
    return duplicateState;
  }
  return state;
};
