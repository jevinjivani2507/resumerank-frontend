class APIConstants {
  BASE_URL = "https://jellyfish-app-p8x64.ondigitalocean.app/api";

  // Controllers
  USER = this.BASE_URL + "";

  // User Endpoints
  GET_USER = this.USER + "/";

  SIGNUP = this.USER + "/signup";
  LOGIN = this.USER + "/login";
  GOOGLE_LOGIN = this.USER + "/google/login";

  // Resume Endpoints
  UPLOAD_RESUME = (id: string) => this.USER + `/${id}/upload-resume`;
  GET_JOBS = (id: string) => this.BASE_URL + `/${id}/get-jobs`;
}

const API_CONSTANTS = new APIConstants();
export default API_CONSTANTS;
