<template>
  <main>
    <h1>Jukebox</h1>
    <Player :currentTrack="currentTrack" @updateRepeatMode="updateRepeatMode" />
    <Playlist :playlist="playlist" @playTrack="playTrack" @deleteTrack="deleteTrack" />
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
    currentTrack() {
      return this.currentTrackIndex !== null
          ? this.playlist[this.currentTrackIndex]
          : null;
    },
  },
  methods: {
    updateRepeatMode(mode) {
      this.repeatMode = mode;
    },
    addTrack(track) {
      console.log(track);

      if (track.title && track.url) {
        this.playlist.push({
          title: track.title,
          url: track.url, // Assure-toi que src est une URL valide
        });
      } else {
        console.error("La piste ajoutée est invalide.");
      }
    },
    playTrack(index) {
      this.currentTrackIndex = index;
    },
    deleteTrack(index) {
      if (this.currentTrackIndex === index) {
        this.currentTrackIndex = null;
      }
      this.playlist.splice(index, 1);
    },
  },
};
</script>
