export const callback = () => {
  if (process.env.IS_ELECTRON) return window.location.origin + "/index.html";
  return window.location.origin + "/login/callback";
};
