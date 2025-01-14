<template>
  <section class="player-section">
    <h2>Player</h2>
    <div class="current-track">{{ currentTrackTitle }}</div>

    <audio ref="audio" :src="currentTrackUrl" @ended="onTrackEnd"></audio>

    <div class="controls">
      <button @click="playAudio" :disabled="!currentTrackUrl || isPlaying">Play</button>
      <button @click="pauseAudio" :disabled="!isPlaying">Pause</button>
      <button @click="stopAudio" :disabled="!isPlaying">Stop</button>
    </div>

    <fieldset class="playback-mode">
      <legend>Playback Mode</legend>
      <label>
        <input type="radio" value="REPEAT_LIST" v-model="repeatMode" />
        Repeat List
      </label>
      <label>
        <input type="radio" value="REPEAT_TRACK" v-model="repeatMode" />
        Repeat Track
      </label>
      <label>
        <input type="radio" value="NO_REPEAT" v-model="repeatMode" />
        Don't Repeat
      </label>
    </fieldset>
  </section>
</template>

<script>
export default {
  props: {
    currentTrack: String, // Title of the current track
    currentTrackUrl: String, // URL of the current track
  },
  data() {
    return {
      repeatMode: 'NO_REPEAT',
      isPlaying: false,
    };
  },
  computed: {
    currentTrackTitle() {
      return this.currentTrack || 'Choose a track to play.';
    },
  },
  methods: {
    playAudio() {
      const audio = this.$refs.audio;
      if (audio) {
        audio.play();
        this.isPlaying = true;
      }
    },
    pauseAudio() {
      const audio = this.$refs.audio;
      if (audio) {
        audio.pause();
        this.isPlaying = false;
      }
    },
    stopAudio() {
      const audio = this.$refs.audio;
      if (audio) {
        audio.pause();
        audio.currentTime = 0; // Reset playback position
        this.isPlaying = false;
      }
    },
    onTrackEnd() {
      this.isPlaying = false;

      // Emit an event to parent for next track handling
      this.$emit('trackEnded', this.repeatMode);
    },
  },
  watch: {
    repeatMode(newValue) {
      this.$emit('updateRepeatMode', newValue);
    },
    currentTrackUrl() {
      // Automatically play the track if a new one is selected
      this.isPlaying = false;
      this.playAudio();
    },
  },
};
</script>

<style>
.player-section {
  margin: 1em 0;
}
.controls button {
  margin: 0 0.5em;
}
</style>
