import axios from "axios";
import { useLocation } from "react-router-dom";

export function roundPrice(num) {
  return (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2);
}

export function fetch(url, { method = "GET", query = {}, body = {}, headers = { "content-type": "application/json" } } = {}) {
  return axios({
    url: url,
    method: method,
    params: query,
    data: body,
    headers: headers,
  }).then(res => res.data);
}

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}
