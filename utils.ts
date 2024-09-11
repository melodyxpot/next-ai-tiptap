import wrapFetch from "fetch-retry";

export const fetchWithRetry = wrapFetch(fetch);

export const exponentialBackoff = function (attempt: number) {
  return Math.pow(2, attempt) * 1000; // 1000, 2000, 4000
};
