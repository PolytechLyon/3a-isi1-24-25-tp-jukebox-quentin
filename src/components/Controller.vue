<script setup>
import {ref, watch} from "vue";

const props = defineProps({
  titre: String,
  srcAudio: String,
  load: Boolean
})

const emit = defineEmits(["ended"]);

watch(() => props.load, () => {
  if (audio.value) {
    audio.value.src = props.srcAudio;
    audio.value.load();
    play();
  }
});

const currentTime = ref(0);
const duration = ref(0);
let audio = ref(null);
audio.value = undefined;

const currentState = ref("aucun");
const svgStates = {
  aucun: [
    "M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z",
  ],
  liste: [
    "M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z",
  ],
  titre: [
    "M0 4.75A3.75 3.75 0 0 1 3.75 1h.75v1.5h-.75A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5ZM12.25 2.5a2.25 2.25 0 0 1 2.25 2.25v5A2.25 2.25 0 0 1 12.25 12H9.81l1.018-1.018a.75.75 0 0 0-1.06-1.06L6.939 12.75l2.829 2.828a.75.75 0 1 0 1.06-1.06L9.811 13.5h2.439A3.75 3.75 0 0 0 16 9.75v-5A3.75 3.75 0 0 0 12.25 1h-.75v1.5h.75Z",
    "m8 1.85.77.694H6.095V1.488c.697-.051 1.2-.18 1.507-.385.316-.205.51-.51.583-.913h1.32V8H8V1.85Z",
    "M8.77 2.544 8 1.85v.693h.77Z",
  ],
};

function handlePlayClick() {
  const buttonPath = document.querySelector('.play-button');
  if (buttonPath.value === "lecture") {
    pause();
  } else if (buttonPath.value === "pause") {
    play();
  }
}
function play() {
  const buttonPath = document.querySelector('.play-button');
  const svgPath = buttonPath.querySelector('.play-icon path');
  svgPath.setAttribute('d', 'M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z');
  buttonPath.setAttribute('value', 'lecture');
  audio.value.play();
}

function pause() {
  const buttonPath = document.querySelector('.play-button');
  const svgPath = buttonPath.querySelector('.play-icon path');
  svgPath.setAttribute('d', 'M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z');
  buttonPath.setAttribute('value', 'pause')
  audio.value.pause();
}

function handleRepeatClick() {
  const buttonPath = document.querySelector('.repeat-button');
  const svgPath = buttonPath.querySelector('.repeat-icon');

  if (currentState.value === "aucun") {
    svgPath.style.fill = '#1ed760';
    currentState.value = "liste";
  } else if (currentState.value === "liste") {
    currentState.value = "titre";
  } else if (currentState.value === "titre") {
    svgPath.style.fill = '#f0f0f0';
    currentState.value = "aucun";
  }
}

function updateProgress() {
  currentTime.value = Math.floor(audio.value.currentTime);
}

function getProgress() {
  audio.value.currentTime = currentTime.value;
}

function onLoaded() {
  duration.value = audio.value.duration;

}

function onEnded() {
  pause();
  emit("ended", currentState.value);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const secondes = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${secondes}`;
}

</script>

<template>
  <footer>
    <audio ref="audio" @loadeddata="onLoaded" @timeupdate="updateProgress" @ended="onEnded">
      <source :src="srcAudio" type="audio/mpeg">
    </audio>
    <div class="audio-titre"><h3>{{titre}}</h3></div>
    <div class="audio-controls">
      <div class="audio-buttons">
        <button class="play-button" @click="handlePlayClick" value="pause">
          <svg class="play-icon" viewBox="0 0 16 16">
            <path
                d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
          </svg>
        </button>
        <button class="repeat-button" @click="handleRepeatClick" :value="currentState">
          <svg class="repeat-icon" viewBox="0 0 16 16">
            <path
                v-for="(path, index) in svgStates[currentState]"
                :key="index"
                :d="path">
            </path>
          </svg>
        </button>
      </div>
      <div class="audio-progress">
        <span>{{ formatTime(currentTime) }}</span>
        <input type="range" id="progress-bar" v-model="currentTime" @input="getProgress" step="0.1" :max="duration"/>
        <span>{{ formatTime(duration) }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>