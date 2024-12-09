let loader = document.querySelector(".loader");
let opacity = 1;
window.onload = () => {
  setTimeout(() => {
    let opacityHadel = setInterval(() => {
      if (opacity > 0) {
        opacity -= 0.1;
        loader.style.cssText = `opacity: ${opacity}`;
      } else {
        loader.remove();
        clearInterval(opacityHadel);
      }
    }, 20);
  }, 1500);
};
