<script setup>
import { ref } from "vue";

const emit = defineEmits(["add"]);
const method = ref("url");
const url = ref("");
const file = ref(null);

function addMusic() {
  let src = "";
  
  if (method.value === "url") {
    if (validateSpotifyURL(url.value)) {
      src = url.value;
    } else {
      alert("Le lien fourni n'est pas un lien Spotify valide !");
      return;
    }
  } else if (method.value === "file") {
    src = URL.createObjectURL(file.value);
  }

  emit("add", {
    titre: document.getElementById("titre").value,
    src: src,
  });
}

function onFileChange(event) {
  file.value = event.target.files[0];
}

function validateSpotifyURL(link) {
  const spotifyRegex = /^(https:\/\/open\.spotify\.com\/.*?(track|playlist|album)\/[a-zA-Z0-9]+)(\?.*)?$/;
  return spotifyRegex.test(link);
}
</script>

<template>
  <label for="method-selector">Ajouter Musique</label>
  <select v-model="method" id="method-selector">
    <option value="url">A partir d'un URL</option>
    <option value="file">A partir d'un fichier</option>
  </select>

  <input type="text" id="titre" required />

  <!-- URL input section -->
  <div v-show="method === 'url'">
    <input v-model="url" placeholder="Provide URL" type="text" />
    <button :disabled="!url" @click="addMusic">Ajouter par URL</button>
  </div>

  <!-- File upload section -->
  <div v-show="method === 'file'">
    <input type="file" @change="onFileChange" />
    <button :disabled="!file" @click="addMusic">Ajouter par fichier</button>
  </div>
</template>


<style scoped>
</style>