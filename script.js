let library;
let currentFolder = null;

const player = document.getElementById("audioPlayer");

fetch("library.json")
  .then((response) => response.json())
  .then((data) => {
    library = data;
    loadFolders();
  });

function loadFolders() {
  const foldersDiv = document.getElementById("folders");
  foldersDiv.innerHTML = "";

  Object.keys(library).forEach((folder) => {
    const div = document.createElement("div");
    div.className = "folder";
    div.innerText = folder;

    div.onclick = () => {
      currentFolder = folder;
      loadTracks(folder);
    };

    foldersDiv.appendChild(div);
  });
}

function loadTracks(folder) {
  const tracksDiv = document.getElementById("tracks");
  tracksDiv.innerHTML = "";

  library[folder].forEach((track) => {
    const div = document.createElement("div");
    div.className = "track";
    div.innerText = track;

    div.onclick = () => {
      player.src = `audio/${folder}/${track}`;

      document.getElementById("nowPlaying").innerText = track;

      player.play();
    };

    tracksDiv.appendChild(div);
  });
}

function playAudio() {
  player.play();
}

function pauseAudio() {
  player.pause();
}

document.getElementById("volumeSlider").addEventListener("input", (e) => {
  player.volume = e.target.value;
});
