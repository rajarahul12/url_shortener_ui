import axios from "axios";

const instance = axios.create({
  baseURL: "https://urishorten.herokuapp.com",
});

export default instance;
