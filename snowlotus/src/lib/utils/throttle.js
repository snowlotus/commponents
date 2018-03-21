
export default function throttle (fn, delay = 300, cycle = 300) {
  let timer, last = new Date();
  return function() {
    let context = this,
    args = arguments,
    now = new Date();
    clearTimeout(timer);
    if (now - last >= cycle) {
      fn.apply(context, args);
      last = now;
    } else {
      timer = setTimeout(function() {
        fn.apply(context, args);
      },
      delay);
    }
  }
}
