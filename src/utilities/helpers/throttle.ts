let timeout = null as number | null;

export default (callback: Function, duration = 10) => {
  if (!timeout) {
    callback();
    timeout = setTimeout(() => {
      timeout = null;
    }, duration);
  }
};
