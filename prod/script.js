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






// ripple effect ????

document.querySelectorAll('.big-list li').forEach((li) => {
  li.addEventListener('mouseenter', () => {
    const textElement = li.querySelector('.ripple-text');
    const text = textElement.textContent;
    const centerIndex = Math.floor(text.length / 2); // Determine center of text

    textElement.innerHTML = ''; // Clear existing text
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char; // Replace spaces with non-breaking spaces
      
      // Calculate delay and scale factor based on distance from the center
      const distance = Math.abs(index - centerIndex);
      const delay = distance * 50;
      const scaleFactor = 1 - (distance / centerIndex) * 0.5; // Scale from 1 to 0.5

      span.style.animationDelay = `${delay}ms`;
      span.style.setProperty('--scale-factor', scaleFactor);
      span.classList.add('ripple-letter');
      textElement.appendChild(span);
    });
  });

  li.addEventListener('mouseleave', () => {
    const textElement = li.querySelector('.ripple-text');
    textElement.textContent = textElement.textContent.replace(/\u00A0/g, ' '); // Reset the text and restore spaces
  });
});
