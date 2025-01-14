<script setup>
import AudioController from './components/Controller.vue'
import Playlist from './components/Playlist.vue'
import {ref} from "vue";

let srcAudio = ref('');
let titre = ref('');
let load = ref(false);
srcAudio.value = "/public/music.mp3";

let next = ref([false]);

function handleEnded(currentState) {
  console.log(currentState);
  if (currentState === "aucun") {
    next.value[0] = !next.value[0];
    next.value[1] = false
  } else if (currentState === "liste") {
    next.value[0] = !next.value[0];
    next.value[1] = true
  } else if (currentState === "titre") {
    load.value = !load.value;
  }
}

function changeSrc(item) {
  console.log("test")
  srcAudio.value = item.src;
  titre.value = item.titre;
  load.value = !load.value;
}

</script>

<template>
  <h1>Jukebox</h1>
  <Playlist @item="changeSrc" :next="next"/>
  <AudioController :src-audio="srcAudio" :titre="titre" :load="load" @ended="handleEnded"/>
</template>


<style scoped>
h1 {
  color: white;
}
</style>
