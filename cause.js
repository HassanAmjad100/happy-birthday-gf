// Song22 dedication popup on cause page
(function () {
  var causeMusic = document.getElementById("cause-bg-music");
  var overlay = document.getElementById("cause-song-overlay");
  var playBtn = document.getElementById("cause-play-btn");
  if (playBtn && overlay && causeMusic) {
    playBtn.addEventListener("click", function () {
      causeMusic.play().catch(function () {});
      overlay.classList.add("hidden");
    });
  }
})();

// Balloons floating up on cause page — fuller look
function createCauseBalloons() {
  var container = document.getElementById("cause-balloons-container");
  if (!container) return;
  var emojis = ["🎈", "🎈", "🎀", "💕", "🌸", "💖"];
  for (var i = 0; i < 16; i++) {
    var b = document.createElement("div");
    b.className = "cause-balloon";
    b.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    b.style.left = Math.random() * 100 + "%";
    container.appendChild(b);
    (function (el) {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.3 },
        { opacity: 0.9, scale: 1, duration: 0.4, ease: "back.out" },
      );
      gsap.to(el, {
        y: -window.innerHeight - 80,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 30 - 15,
        duration: Math.random() * 3 + 5,
        delay: 0.3,
        ease: "none",
        onComplete: function () {
          el.remove();
        },
      });
    })(b);
  }
}

// Sparkles on cause page
function createCauseSparkle() {
  var container = document.getElementById("cause-balloons-container");
  if (!container) return;
  var s = document.createElement("div");
  s.className = "cause-sparkle-dot";
  s.style.left = Math.random() * 100 + "%";
  s.style.top = Math.random() * 100 + "%";
  container.appendChild(s);
  gsap.fromTo(
    s,
    { opacity: 0, scale: 0 },
    { opacity: 0.9, scale: 1, duration: 0.25 },
  );
  gsap.to(s, {
    opacity: 0,
    scale: 0.5,
    duration: 1,
    delay: 0.4,
    onComplete: function () {
      s.remove();
    },
  });
}

// Reasons database
const reasons = [
  {
    text: "Meri jaan you are the reason why I feel so alive every single day meenu ji 💖",
    emoji: "🌟",
    gif: "gif1.gif",
  },
  {
    text: "Allah kre apka har din khushi or kamyabi s bharpoor ho. 🌸 ",
    emoji: "💗",
    gif: "gif2.gif",
  },
  {
    text: "Wishing you success, happiness, and everything your heart desires. ✨ ",
    emoji: "💕",
    gif: "gif1.gif",
  },
  {
    text: "Stay the way you are Minahil. You are the most purest person I have come across kuchu puchu🥳 ",
    emoji: "👸🏻",
    gif: "gif2.gif",
  },

  {
    text: "Apko mein itni khushi or pyaar doun k ap hamesha khilti rho Minahil 🌹 ",
    emoji: "🩷",
    gif: "gif2.gif",
  },

  {
    text: "Meenu Ap meri phool ho or mein har pal qed krna chahta houn jo b apke sath guzarta hy mera ",
    emoji: "💝",
    gif: "gif1.gif",
  },

  {
    text: "Minahil Ap mere dil mein basti ho usi mein abad ho and hamesha udhr hi abad rhogi mere dil ki malkin ho",
    emoji: "💘",
    gif: "gif2.gif",
  },
  {
    text: "Meenu you are my first thought after getting up in the morning and last thought when i am sleeping",
    emoji: "♥️",
    gif: "gif1.gif",
  },
  {
    text: "Kuchu puchu whenever i look into your eyes I wish I could drown in them and never come back",
    emoji: "🫀",
    gif: "gif2.gif",
  },
  {
    text: "The only thing I am afraid of in my life right now is losing you and I can never afford to do so ever",
    emoji: "❤️‍🩹",
    gif: "gif2.gif",
  },
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById("reasons-container");
const shuffleButton = document.querySelector(".shuffle-button");
const reasonCounter = document.querySelector(".reason-counter");
let isTransitioning = false;

// Create reason card with gif
function createReasonCard(reason) {
  const card = document.createElement("div");
  card.className = "reason-card";

  const text = document.createElement("div");
  text.className = "reason-text";
  text.innerHTML = `${reason.emoji} ${reason.text}`;

  const gifOverlay = document.createElement("div");
  gifOverlay.className = "gif-overlay";
  gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;

  card.appendChild(text);
  card.appendChild(gifOverlay);

  gsap.from(card, {
    opacity: 0,
    y: 50,
    duration: 0.5,
    ease: "back.out",
  });

  return card;
}

// Display new reason
function displayNewReason() {
  if (isTransitioning) return;
  isTransitioning = true;

  if (currentReasonIndex < reasons.length) {
    const card = createReasonCard(reasons[currentReasonIndex]);
    reasonsContainer.appendChild(card);

    // Update counter
    reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${
      reasons.length
    }`;

    currentReasonIndex++;

    // Check if we should transform the button
    if (currentReasonIndex === reasons.length) {
      gsap.to(shuffleButton, {
        scale: 1.1,
        duration: 0.5,
        ease: "elastic.out",
        onComplete: () => {
          shuffleButton.textContent = "Meet my Meenu 💫";
          shuffleButton.classList.add("story-mode");
          shuffleButton.addEventListener("click", () => {
            gsap.to("body", {
              opacity: 0,
              duration: 1,
              onComplete: () => {
                window.location.href = "last.html";
              },
            });
          });
        },
      });
    }

    // Create floating elements
    createFloatingElement();

    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  } else {
    // Handle navigation to new page or section
    window.location.href = "#storylane";
    // Or trigger your next page functionality
  }
}

// Initialize button click
shuffleButton.addEventListener("click", () => {
  gsap.to(shuffleButton, {
    scale: 0.9,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
  });
  displayNewReason();
});

// Floating hearts, sparkles, balloons — fuller
function createFloatingElement() {
  var elements = [
    "🌸",
    "✨",
    "💖",
    "🦋",
    "⭐",
    "💕",
    "💗",
    "❤️",
    "💫",
    "🎀",
    "🎈",
  ];
  var howMany = 2 + Math.floor(Math.random() * 2);
  for (var n = 0; n < howMany; n++) {
    (function () {
      var element = document.createElement("div");
      element.className = "floating";
      element.textContent =
        elements[Math.floor(Math.random() * elements.length)];
      element.style.left = Math.random() * window.innerWidth + "px";
      element.style.top = Math.random() * 40 + 60 + "%";
      element.style.fontSize = Math.random() * 18 + 14 + "px";
      document.body.appendChild(element);
      gsap.fromTo(
        element,
        { opacity: 0, scale: 0.5 },
        { opacity: 0.9, scale: 1, duration: 0.4, ease: "back.out" },
      );
      gsap.to(element, {
        y: -550,
        x: Math.random() * 80 - 40,
        rotation: Math.random() * 360,
        duration: Math.random() * 6 + 6,
        ease: "none",
        delay: 0.2,
        onComplete: function () {
          element.remove();
        },
      });
    })();
  }
}

// Custom cursor (same as before)
const cursor = document.querySelector(".custom-cursor");
document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX - 15,
    y: e.clientY - 15,
    duration: 0.2,
  });
});

// Start balloons and sparkles on load, keep them coming
createCauseBalloons();
setTimeout(createCauseBalloons, 2000);
setInterval(createCauseBalloons, 6000);
setInterval(createCauseSparkle, 350);
setInterval(createFloatingElement, 900);
