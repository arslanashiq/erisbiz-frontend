let timer;
export default function debounce(callback, delay = 100) {
  clearTimeout(timer);
  timer = setTimeout(() => {
    callback();
  }, delay);
}
