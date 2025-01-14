<template>
  <main>
    <h1>Jukebox</h1>
    <Player :currentTrack="currentTrackTitle" @updateRepeatMode="updateRepeatMode" />
    <Playlist :playlist="playlist" @playTrack="playTrack" />
    <AddTrack @addTrack="addTrack" />
  </main>
</template>

<script>
import Player from '../src/components/player.vue';
import Playlist from '../src/components/playliste.vue';
import AddTrack from '../src/components/AddMusic.vue';

export default {
  components: {
    Player,
    Playlist,
    AddTrack,
  },
  data() {
    return {
      repeatMode: 'NO_REPEAT',
      playlist: [],
      currentTrackIndex: null,
    };
  },
  computed: {
    currentTrackTitle() {
      return this.currentTrackIndex !== null
        ? this.playlist[this.currentTrackIndex].title
        : null;
    },
  },
  methods: {
    updateRepeatMode(mode) {
      this.repeatMode = mode;
    },
    addTrack(track) {
      this.playlist.push(track);
    },
    playTrack(index) {
      this.currentTrackIndex = index;
    },
  },
};
</script>
