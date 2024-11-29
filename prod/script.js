// stack animation on enter viewport
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio === 1) { 
      entry.target.classList.add('active');
      return;
    }

    entry.target.classList.remove('active');
  });
}, { threshold: 1.0 }); 

const squares = document.querySelectorAll('.interactive');
squares.forEach((element) => observer.observe(element));

// hide waiting list button when form is in view
function checkVisibilityOfForm() {
  const form = document.getElementById('form');
  const formLink = document.getElementById('scroll-to-form');

  if (form.getBoundingClientRect().top >= 0 && form.getBoundingClientRect().bottom <= window.innerHeight) {
    formLink.classList.add('hidden');
  } else {
    formLink.classList.remove('hidden');
  }
}

checkVisibilityOfForm();

window.addEventListener('resize', checkVisibilityOfForm);
window.addEventListener('scroll', checkVisibilityOfForm);

// hero video controls
document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("myVideo");
  const controlButton = document.getElementById("control");

  function updateButton() {
    if (video.ended) {
      controlButton.innerHTML = 'Replay <div class="icon"></div>';
      controlButton.className = "replay";
    } else if (video.paused) {
      controlButton.innerHTML = 'Play <div class="icon"></div>';
      controlButton.className = "play";
    } else {
      controlButton.innerHTML = 'Pause <div class="icon"></div>';
      controlButton.className = "pause";
    }
  }

  controlButton.addEventListener("click", function () {
    if (video.ended) {
      video.currentTime = 0;
      video.play();
    } else if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    updateButton();
  });

  video.addEventListener("play", updateButton);
  video.addEventListener("pause", updateButton);
  video.addEventListener("ended", updateButton);

  updateButton();
});


// smooth scroll to form
document.getElementById('scroll-to-form').addEventListener('click', function(event) {
    event.preventDefault();
    const formElement = document.getElementById('form');
    const headerOffset = 256;
    const elementPosition = formElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
});

// current year on footer
document.getElementById("year").innerHTML = new Date().getFullYear();



// holo on scroll

document.addEventListener("DOMContentLoaded", () => {
  const screens = document.querySelectorAll(".screen");
  let lastScrollY = window.scrollY;

  const onScroll = () => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;

    screens.forEach((screen) => {
      const currentBackgroundY = parseFloat(
        getComputedStyle(screen).backgroundPositionY
      );

      const newBackgroundY = currentBackgroundY + scrollDelta * 1.8; 
      const limitedBackgroundY = ((newBackgroundY % 240) + 240) % 240;

      screen.style.backgroundPosition = `0 ${limitedBackgroundY}px`;
    });

    lastScrollY = currentScrollY;
  };
  window.addEventListener("scroll", onScroll);
});
