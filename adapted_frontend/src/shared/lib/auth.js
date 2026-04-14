import { getToken } from "./token";

export function hasToken() {
  return !!getToken();
}