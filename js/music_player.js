document.addEventListener("DOMContentLoaded", function () {
  const playlist = [
    "/CyberMa/audio/music_1.mp3",
    "/CyberMa/audio/bgm.mp3",
    "/CyberMa/audio/bgm.mp3"
  ];

  let current = 0;
  const audio = document.createElement("audio");
  audio.id = "bg-music";
  audio.loop = false;
  document.body.appendChild(audio);

  const btn = document.getElementById("music-toggle");
  const prevBtn = document.getElementById("music-prev");
  const nextBtn = document.getElementById("music-next");
  const indexDisplay = document.getElementById("music-index");

  function updateDisplay() {
    indexDisplay.innerText = `Currently: ${current + 1} / ${playlist.length}`;
  }

  updateDisplay();

  btn.addEventListener("click", function () {
    if (audio.paused) {
      audio.src = playlist[current];
      audio.play();
      btn.innerText = "⏸";
    } else {
      audio.pause();
      btn.innerText = "▶";
    }
  });

  nextBtn.addEventListener("click", function () {
    const wasPlaying = !audio.paused;

    current = (current + 1) % playlist.length;

    audio.src = playlist[current];
    audio.load();

    if (wasPlaying) {
      audio.play();
    }

    updateDisplay();
  });

  prevBtn.addEventListener("click", function () {
    const wasPlaying = !audio.paused;

    current--;

    if (current < 0)
      current = playlist.length - 1;

    audio.src = playlist[current];
    audio.load();

    if (wasPlaying) {
      audio.play();
    }

    updateDisplay();
  });

  audio.addEventListener("ended", function() {
    current = (current + 1) % playlist.length;
    audio.src = playlist[current];
    audio.play();
    updateDisplay();
  });
});