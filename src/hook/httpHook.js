import { useReducer, useCallback } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "SEND":
      return { ...state, loading: true };
    case "RESPONSE":
      return {
        ...state,
        loading: false,
        data: action.resData,
        extra: action.extra,
      };
    // case "ERROR":
    // case "CLEAR":
    default:
      return state;
  }
};

export const useHttp = () => {
  const [fetchedData, dispath] = useReducer(reducer, {
    loading: false,
    data: [],
    extra: "",
  });

  const sendRequest = useCallback((url, extra) => {
    dispath({ type: "SEND" });
    fetch(url, { method: "GET" })
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        dispath({ type: "RESPONSE", resData: resData, extra: extra });
      });
  }, []);

  return {
    request: sendRequest,
    data: fetchedData.data,
    loading: fetchedData.loading,
    extra: fetchedData.extra,
  };
};
