(function () {
  const scriptEl = document.currentScript;
  const base = new URL("../", scriptEl ? scriptEl.src : location.href).pathname; // /CyberMa/

 const playlist = [
  base + "audio/music_1.mp3",
  base + "audio/bgm.mp3",
  base + "audio/bgm.mp3"
];

  function init() {
    let current = 0;
    const audio = document.createElement("audio");
    audio.id = "bg-music";
    document.body.appendChild(audio);

    const btn = document.getElementById("music-toggle");
    const prevBtn = document.getElementById("music-prev");
    const nextBtn = document.getElementById("music-next");
    const indexDisplay = document.getElementById("music-index");
    if (!btn) return;

    const update = () =>
      (indexDisplay.innerText = "Currently: " + (current + 1) + " / " + playlist.length);
    update();

    btn.addEventListener("click", () => {
      if (audio.paused) {
        if (!audio.src) audio.src = playlist[current];
        audio.play();
        btn.innerText = "⏸";
      } else {
        audio.pause();
        btn.innerText = "▶";
      }
    });

    function go(step) {
      const wasPlaying = !audio.paused;
      current = (current + step + playlist.length) % playlist.length;
      audio.src = playlist[current];
      audio.load();
      if (wasPlaying) audio.play();
      update();
    }
    nextBtn.addEventListener("click", () => go(1));
    prevBtn.addEventListener("click", () => go(-1));
    audio.addEventListener("ended", () => go(1));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();