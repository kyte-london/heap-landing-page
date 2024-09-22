// animation on enter viewport
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

// hide waiting list button

function checkVisibility() {
  const form = document.getElementById('form');
  const formLink = document.getElementById('scroll-to-form');

  if (form.getBoundingClientRect().top >= 0 && form.getBoundingClientRect().bottom <= window.innerHeight) {
    formLink.classList.add('hidden');
  } else {
    formLink.classList.remove('hidden');
  }
}

// Initial check
checkVisibility();

// Add event listener for window resize and scroll
window.addEventListener('resize', checkVisibility);
window.addEventListener('scroll', checkVisibility);

// video playback controls
document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("myVideo");
  const pauseControl = document.getElementById("pauseControl");
  const playControl = document.getElementById("playControl");
  const replayControl = document.getElementById("replayControl");

  function updateControls() {
    if (video.paused) {
      playControl.style.display = "flex";
      pauseControl.style.display = "none";
      replayControl.style.display = "none";

    } else {
      playControl.style.display = "none";
      pauseControl.style.display = "flex";
      replayControl.style.display = "none";
    }
  }

  video.addEventListener("play", updateControls);
  video.addEventListener("pause", updateControls);

  video.addEventListener("ended", function () {
    replayControl.style.display = "flex";
    playControl.style.display = "none";
    pauseControl.style.display = "none";
  });

  pauseControl.addEventListener("click", function () {
    video.pause();
  });

  playControl.addEventListener("click", function () {
    video.play();
  });

  replayControl.addEventListener("click", function () {
    video.currentTime = 0;
    video.play();
  });

  updateControls();
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
