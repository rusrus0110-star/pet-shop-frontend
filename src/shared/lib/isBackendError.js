export function isBackendError(data) {
  return Boolean(data && typeof data === "object" && data.status === "ERR");
}
