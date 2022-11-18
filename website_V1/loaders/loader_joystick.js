const transition = document.querySelector(".transition");

const home = document.querySelector(".home");

home.addEventListener("click", (e) => {
    e.preventDefault();
    transition.classList.add("slide");
    
    setTimeout(() => {
      window.location = home.href;
    }, 600);
  
  });