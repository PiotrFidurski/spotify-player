export default function debounce(fn: (...args: any) => void, delay: number) {
  let timeOutId: any = undefined;
  return (...args: any) => {
    if (timeOutId) clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
