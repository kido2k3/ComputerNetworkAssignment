import Peer from "peerjs";

let peer = new Peer();

export const updateUserInfo = (payload) => {
  return {
    type: "UPDATE_USER_LOGIN",
    payload: payload,
  };
};
export const updateUserPeer = (data) => {
  return {
    type: "UPDATE_PEER",
    payload: data,
  };
};
export const updatePeerConnection = (data) => {
  return {
    type: "UPDATE_PEER_CONNECTION",
    payload: data,
  };
};
export const updateListFile = (data) => {
  return {
    type: "UPDATE_LIST_FILE",
    payload: data,
  };
};
export const updateSharedFile = (data) => {
  return {
    type: "UPDATE_SHARED_FILE",
    payload: data,
  };
};
export const updateLogout = (data) => {
  return {
    type: "LOG_OUT",
  };
};
const AuthReducer = (
  state = {
    username: "",
    peerID: "",
    newPeer: peer,
    connection: peer.connect(undefined),
    listFile: [],
    sharedFile: [],
    //Token
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_USER_LOGIN":
      const { username, peerID } = payload;
      return {
        ...state,
        username: username,
        peerID: peerID,
      };
    case "REMOVE_USER":
      return {
        ...state,
        username: "",
        peerID: "",
      };
    case "UPDATE_PEER": {
      return {
        ...state,
        newPeer: payload,
      };
    }
    case "UPDATE_PEER_CONNECTION": {
      return {
        ...state,
        connection: payload,
      };
    }
    case "UPDATE_LIST_FILE": {
      return {
        ...state,
        listFile: [...state.listFile, payload],
      };
    }
    case "UPDATE_SHARED_FILE": {
      return {
        ...state,
        sharedFile: payload,
      };
    }
    case "LOG_OUT": {
      return {
        ...state,
        username: "",
        peerID: "",
      };
    }
    default:
      return state;
  }
};
export default AuthReducer;
