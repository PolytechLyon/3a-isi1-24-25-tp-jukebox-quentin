<template>
  <section class="player-section">
    <h2>Audio Player</h2>
    <div class="current-track">
      {{ currentTrackTitle }}
    </div>

    <progress :value="progress" max="1"></progress>
    <div class="controls">
      <button @click="playAudio" :disabled="!currentTrack">Play</button>
      <button @click="pauseAudio" :disabled="!currentTrack || audio.paused">Pause</button>
      <button @click="stopAudio" :disabled="!currentTrack">Stop</button>
    </div>

    <div class="mode-selector">
      <label>
        <input type="radio" name="mode" value="none" v-model="mode" /> No Repeat
      </label>
      <label>
        <input type="radio" name="mode" value="repeat" v-model="mode" /> Repeat All
      </label>
      <label>
        <input type="radio" name="mode" value="next" v-model="mode" /> Next Track
      </label>
      <label>
        <input type="radio" name="mode" value="repeat-once" v-model="mode" /> Repeat Once
      </label>
    </div>

    <audio ref="audio" @timeupdate="updateProgress" @ended="onTrackEnd"></audio>
  </section>
</template>

<script>
export default {
  props: {
    currentTrack: {
      type: [Object, String], // Accepter les deux types
      required: true,
    },
  },

  data() {
    return {
      progress: 0,
      mode: 'none', // Modes : none, repeat, next, repeat-once
    };
  },
  computed: {
    currentTrackTitle() {
      return this.currentTrack ? this.currentTrack.title : "No track selected.";
    },
    audio() {
      return this.$refs.audio;
    },
  },
  watch: {
    currentTrack: {
      handler(newTrack) {
        if (newTrack && this.audio) {
          this.audio.pause();
          this.audio.src = newTrack.url;
          this.audio.load();
          this.audio.play().catch(err => {
            console.error("Erreur lors de la lecture :", err);
          });
        }
      },
      immediate: true,
    },
  },
  methods: {
    playAudio() {
      if (this.currentTrack && this.audio.paused) {
        this.audio.play().catch(err => {
          console.error("Erreur de lecture :", err);
        });
      }
    },
    pauseAudio() {
      if (!this.audio.paused) {
        this.audio.pause();
      }
    },
    stopAudio() {
      if (this.currentTrack) {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.progress = 0;
      }
    },
    updateProgress() {
      if (this.audio.duration) {
        this.progress = this.audio.currentTime / this.audio.duration;
      }
    },
    onTrackEnd() {
      switch (this.mode) {
        case 'repeat-once':
          this.audio.currentTime = 0;
          this.audio.play();
          break;
        case 'next':
          this.$emit('nextTrack');
          break;
        case 'repeat':
          this.$emit('nextTrack');
          break;
        default:
          this.stopAudio();
          break;
      }
    },
  },
};
</script>

<style>
.player-section {
  margin: 20px 0;
}

.current-track {
  font-weight: bold;
  margin-bottom: 10px;
}

progress {
  width: 100%;
  height: 10px;
  margin-bottom: 10px;
}

.controls button {
  margin-right: 5px;
}

.mode-selector {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.mode-selector label {
  display: flex;
  align-items: center;
  cursor: pointer ;
}

.mode-selector input[type="radio"] {
  margin-right: 5px;
}
</style>
