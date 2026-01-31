// Birthday jingle: auto-play on first page load (fallback to tap/click if blocked)
var jinglePlayed = false;
var jingle = document.getElementById("birthday-jingle");
function playJingleOnce() {
  if (jinglePlayed || !jingle) return;
  jinglePlayed = true;
  jingle.currentTime = 0;
  var p = jingle.play();
  if (p && typeof p.then === "function")
    p.catch(function () {
      jinglePlayed = false;
    });
}
// Try to start jingle automatically when the page is ready
window.addEventListener("load", function () {
  playJingleOnce();
});
document.addEventListener("click", playJingleOnce, { once: true });
document.addEventListener("touchstart", playJingleOnce, { once: true });
document.addEventListener("keydown", playJingleOnce, { once: true });

// Jingle toast: show message and allow manual play if autoplay blocked
var jingleToast = document.getElementById("jingle-toast");
var jingleBtn = document.getElementById("jingle-play-btn");

function showJingleToast(showPlayButton) {
  if (!jingleToast) return;
  if (showPlayButton) {
    jingleBtn.classList.remove("hidden");
  } else {
    jingleBtn.classList.add("hidden");
  }
  jingleToast.style.display = "flex";
}

function hideJingleToast() {
  if (!jingleToast) return;
  jingleToast.style.display = "none";
}

// Attempt autoplay and update toast depending on result
window.addEventListener("load", function () {
  // small delay to let audio element initialize
  setTimeout(function () {
    if (!jingle) return;
    var attempt = jingle.play();
    if (attempt && typeof attempt.then === "function") {
      attempt
        .then(function () {
          // autoplay allowed
          jinglePlayed = true;
          hideJingleToast();
        })
        .catch(function () {
          // autoplay blocked — show toast with play button
          showJingleToast(true);
        });
    } else {
      // browser might have started playback synchronously
      if (!jingle.paused) {
        jinglePlayed = true;
        hideJingleToast();
      } else {
        showJingleToast(true);
      }
    }
  }, 150);
});

if (jingleBtn) {
  jingleBtn.addEventListener("click", function () {
    if (!jingle) return;
    jingle.currentTime = 0;
    jingle
      .play()
      .then(function () {
        jinglePlayed = true;
        hideJingleToast();
      })
      .catch(function () {
        // still blocked — keep toast visible
        showJingleToast(true);
      });
  });
}

// Balloons: float up continuously for a fuller look
function createBalloons() {
  var container = document.getElementById("balloons-container");
  if (!container) return;
  var emojis = ["🎈", "🎈", "🎀", "🎈", "💕", "🌸"];
  var count = 20;
  for (var i = 0; i < count; i++) {
    var b = document.createElement("div");
    b.className = "balloon";
    b.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    b.style.left = Math.random() * 100 + "%";
    container.appendChild(b);
    (function (el) {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.3 },
        {
          opacity: 0.95,
          scale: 1,
          duration: 0.4,
          ease: "back.out",
        },
      );
      gsap.to(el, {
        y: -window.innerHeight - 100,
        x: Math.random() * 120 - 60,
        rotation: Math.random() * 40 - 20,
        duration: Math.random() * 3 + 5,
        delay: 0.4,
        ease: "none",
        onComplete: function () {
          el.remove();
        },
      });
    })(b);
  }
}

// Party popper / confetti burst when title appears — bigger and fuller
function confettiBurst() {
  var wrap = document.getElementById("confetti-burst");
  if (!wrap) return;
  var pieces = [
    "🎊",
    "🎉",
    "✨",
    "💖",
    "🌸",
    "⭐",
    "💫",
    "🎀",
    "💕",
    "💗",
    "❤️",
    "💝",
  ];
  for (var i = 0; i < 42; i++) {
    var p = document.createElement("div");
    p.className = "confetti-piece";
    p.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    wrap.appendChild(p);
    var angle = (i / 42) * Math.PI * 2 + Math.random() * 0.5;
    var dist = 180 + Math.random() * 150;
    var tx = Math.cos(angle) * dist;
    var ty = Math.sin(angle) * dist;
    (function (el) {
      gsap.fromTo(
        el,
        { x: 0, y: 0, opacity: 1, scale: 1.2 },
        {
          x: tx,
          y: ty,
          opacity: 0,
          scale: 0.4,
          duration: 1.4,
          ease: "power2.out",
          onComplete: function () {
            el.remove();
          },
        },
      );
    })(p);
  }
}

// Cursor following effect
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Typing effect for greeting
const greetingText =
  "Hey You Know What! You're the most adorable human i ever met! 💖";
const greetingElement = document.querySelector(".greeting");
let charIndex = 0;

function typeGreeting() {
  if (charIndex < greetingText.length) {
    greetingElement.textContent += greetingText.charAt(charIndex);
    charIndex++;
    setTimeout(typeGreeting, 100);
  }
}

// Floating hearts, sparkles, balloons — more and fuller
var floatingElements = [
  "💖",
  "✨",
  "🌸",
  "💫",
  "💕",
  "💗",
  "❤️",
  "💝",
  "🎀",
  "⭐",
  "🎈",
];
function createFloating() {
  var howMany = 2 + Math.floor(Math.random() * 2);
  for (var n = 0; n < howMany; n++) {
    (function () {
      var element = document.createElement("div");
      element.className = "floating";
      element.textContent =
        floatingElements[Math.floor(Math.random() * floatingElements.length)];
      element.style.left = Math.random() * 100 + "vw";
      element.style.top = 80 + Math.random() * 20 + "vh";
      element.style.fontSize = Math.random() * 22 + 18 + "px";
      document.body.appendChild(element);
      gsap.fromTo(
        element,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 0.9,
          scale: 1,
          duration: 0.5,
          ease: "back.out",
        },
      );
      gsap.to(element, {
        y: -600,
        x: Math.random() * 120 - 60,
        rotation: Math.random() * 360,
        duration: Math.random() * 4 + 5,
        ease: "none",
        delay: 0.3,
        onComplete: function () {
          element.remove();
        },
      });
    })();
  }
}
// Sparkles: small twinkles scattered on the page
function createSparkle() {
  var container = document.getElementById("balloons-container");
  if (!container) return;
  var s = document.createElement("div");
  s.className = "sparkle-dot";
  s.style.left = Math.random() * 100 + "%";
  s.style.top = Math.random() * 100 + "%";
  container.appendChild(s);
  gsap.fromTo(
    s,
    { opacity: 0, scale: 0 },
    {
      opacity: 0.9,
      scale: 1,
      duration: 0.3,
    },
  );
  gsap.to(s, {
    opacity: 0,
    scale: 0.5,
    duration: 1.2,
    delay: 0.5,
    onComplete: function () {
      s.remove();
    },
  });
}

// Initialize animations
window.addEventListener("load", function () {
  createBalloons();
  setTimeout(createBalloons, 2500);
  setTimeout(createBalloons, 5000);
  setInterval(createBalloons, 7000);
  setInterval(createSparkle, 400);
  gsap.to("h1", {
    opacity: 1,
    duration: 1,
    y: 20,
    ease: "bounce.out",
    onComplete: confettiBurst,
  });
  gsap.to(".cta-button", {
    opacity: 1,
    duration: 1,
    y: -20,
    ease: "back.out",
  });
  typeGreeting();
  setInterval(createFloating, 550);
});

// Hover effects
// Hover effects
document.querySelectorAll(".cta-button").forEach((button) => {
  button.addEventListener("mouseenter", () => {
    gsap.to(button, {
      scale: 1.1,
      duration: 0.3,
    });
  });

  button.addEventListener("mouseleave", () => {
    gsap.to(button, {
      scale: 1,
      duration: 0.3,
    });
  });

  // Smooth page transition on click — play jingle first, then transition
  button.addEventListener("click", function () {
    if (jingle && !jinglePlayed) {
      jinglePlayed = true;
      jingle.currentTime = 0;
      jingle.play().catch(function () {});
    }
    setTimeout(function () {
      gsap.to("body", {
        opacity: 0,
        duration: 1,
        onComplete: function () {
          window.location.href = "cause.html";
        },
      });
    }, 400);
  });
});
