import CONFIG from "./config";

const API_ENDPOINT = {
  REGISTER: `${CONFIG.BASE_URL_API}register`,
  LOGIN: `${CONFIG.BASE_URL_API}login`,
  LIST: `${CONFIG.BASE_URL_API}motors`,
  DETAIL: (id) => `${CONFIG.BASE_URL_API}motors/detail/${id}`,
  POST_MOTOR: `${CONFIG.BASE_URL_API}motors/create/upload`,
  SEARCH_LIST: `${CONFIG.BASE_URL_API}motors/search`,
  COMMENT: (id) => `${CONFIG.BASE_URL_API}motors/${id}/comments`,
};

export default API_ENDPOINT;