<template>
  <section class="player-section">
    <h2>Audio Player</h2>
    <div class="current-track">
      {{ currentTrackTitle }}
    </div>

    <progress :value="progress" max="1"></progress>
    <div class="controls">
      <button @click="playAudio" :disabled="!currentTrack">Play
        <svg class="play-icon" viewBox="0 0 16 16">
            <path
                d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
          </svg>
      </button>
      <button @click="pauseAudio" :disabled="!currentTrack || audio.paused">Pause</button>
      <button @click="stopAudio" :disabled="!currentTrack">Stop</button>
    </div>

    <audio ref="audio" @timeupdate="updateProgress" @ended="onTrackEnd"></audio>
  </section>
</template>

<script>

export default {
  props: {
    currentTrack: Object, // La piste actuelle sélectionnée (ex : { title: 'Track 1', url: 'track1.mp3' })
  },
  data() {
    return {
      progress: 0, // Progression de la lecture entre 0 et 1
    };
  },
  computed: {
    currentTrackTitle() {
      return this.currentTrack ? this.currentTrack.title : "No track selected.";
    },
    audio() {
      return this.$refs.audio; // Référence à l'élément <audio>
    },
  },
  methods: {
    playAudio() {
      if (this.currentTrack) {
        this.audio.src = this.currentTrack.url;
        this.audio.load();
        this.audio.play().catch(error => console.error(error));
      }
    },
    pauseAudio() {
      this.audio.pause();
    },
    stopAudio() {
      this.audio.pause();
      this.audio.currentTime = 0; // Revenir au début
      this.progress = 0;
    },
    updateProgress() {
      if (this.audio.duration) {
        this.progress = this.audio.currentTime / this.audio.duration;
      }
    },
    onTrackEnd() {
      this.stopAudio(); // Arrêter et réinitialiser la piste lorsqu'elle est terminée
    },
  },
};
</script>

<style>

</style>
