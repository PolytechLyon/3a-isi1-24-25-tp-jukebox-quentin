<template>
  <section class="playlist-section">
    <h2>Playlist</h2>
    <ul class="playlist">
      <li v-for="(track, index) in playlist" :key="index">
        {{ track.title }}
        <button @click="playTrack(index)">Play</button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    playlist: Array,
  },
  methods: {
    playTrack(index) {
      this.$emit('playTrack', index);
    },
  },
};
</script>
