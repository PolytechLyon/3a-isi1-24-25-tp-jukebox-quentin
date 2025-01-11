document.addEventListener("DOMContentLoaded", () => {
    const repeatListInput = document.getElementById("repeat-list");
    const repeatTrackInput = document.getElementById("repeat-track");
    const noRepeatInput = document.getElementById("no-repeat");
    const trackMethod = document.getElementById("track-method");
    const inputContainer = document.getElementById("input-container");

    const playerMessage = document.querySelector('.current-track');
    const playlistSection = document.querySelector('.playlist');

    let repeatMode = "NO_REPEAT";
    let playlist = [];
    let currentTrackIndex = null;

    // Gestion des modes de répétition
    repeatListInput.addEventListener("change", () => (repeatMode = "REPEAT_LIST"));
    repeatTrackInput.addEventListener("change", () => (repeatMode = "REPEAT_TRACK"));
    noRepeatInput.addEventListener("change", () => (repeatMode = "NO_REPEAT"));

    // Gérer le changement de méthode pour ajouter une piste
    trackMethod.addEventListener('change', () => {
        inputContainer.innerHTML = ''; // Vider l'entrée actuelle

        if (trackMethod.value === 'url') {
            // Ajouter un champ URL
            inputContainer.innerHTML = `
                <input id="track-url" type="text" placeholder="Provide URL">
                <button id="add-url" disabled>Add by URL</button>
            `;

            const urlInput = document.getElementById("track-url");
            const addByUrlButton = document.getElementById("add-url");

            urlInput.addEventListener("input", () => {
                addByUrlButton.disabled = urlInput.value.trim() === "";
            });

            addByUrlButton.addEventListener("click", () => {
                const url = urlInput.value.trim();
                if (url) {
                    const track = {
                        url,
                        title: url.split("/").pop() || "Unknown Track",
                    };
                    playlist.push(track);
                    renderPlaylist();
                    urlInput.value = "";
                    addByUrlButton.disabled = true;
                }
            });
        } else if (trackMethod.value === 'local') {
            // Ajouter un champ pour charger un fichier
            inputContainer.innerHTML = `
                <input id="track-file" type="file">
                <button id="add-file">Add File</button>
            `;

            const fileInput = document.getElementById("track-file");
            const addFileButton = document.getElementById("add-file");

            addFileButton.addEventListener("click", () => {
                const file = fileInput.files[0];
                if (file) {
                    const track = {
                        url: URL.createObjectURL(file),
                        title: file.name,
                    };
                    playlist.push(track);
                    renderPlaylist();
                }
            });
        }
    });

    // Fonction pour afficher la playlist
    function renderPlaylist() {
        playlistSection.innerHTML = ''; // Réinitialiser la playlist

        playlist.forEach((track, index) => {
            const li = document.createElement("li");
            li.textContent = track.title;

            const playButton = document.createElement("button");
            playButton.textContent = "Play";
            playButton.addEventListener("click", () => playTrack(index));

            li.appendChild(playButton);
            playlistSection.appendChild(li);
        });
    }

    // Fonction pour jouer une piste
    function playTrack(index) {
        currentTrackIndex = index;
        playerMessage.textContent = `Playing: ${playlist[index].title}`;
    }
});
