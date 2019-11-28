import axios from "axios";

/**
 * setup base url.
 */
export default axios.create({
  baseURL: "http://localhost:44324/api"
});
