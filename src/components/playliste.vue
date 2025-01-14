<script setup>
import { defineProps, defineEmits } from 'vue';

// Props (données reçues du parent)
defineProps({
  playlist: {
    type: Array,
    required: true,
  },
});

// Événements émis vers le parent
const emit = defineEmits(['playTrack', 'deleteTrack']);

// Méthodes pour gérer les actions
const playTrack = (index) => {
  emit('playTrack', index); // Émet l'événement 'playTrack' vers le parent
};

const deleteTrack = (index) => {
  emit('deleteTrack', index); // Émet l'événement 'deleteTrack' vers le parent
};
</script>

<template>
  <section class="playlist-section">
    <h2>Playlist</h2>
    <ul class="playlist">
      <li v-for="(track, index) in playlist" :key="index">
        {{ track.title }}
        <button @click="playTrack(index)">Play</button>
        <button @click="deleteTrack(index)">Delete</button>
      </li>
    </ul>
  </section>
</template>

<style scoped>

</style>
