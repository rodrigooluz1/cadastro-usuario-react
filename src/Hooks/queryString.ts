import { useLocation } from "react-router-dom";

function queryString() {
  return new URLSearchParams(useLocation().search);
}

export { queryString };