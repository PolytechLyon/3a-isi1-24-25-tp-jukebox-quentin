<script>
export default {
  data() {
    return {
      trackMethod: 'url',
      newTrack: '',
    };
  },
  methods: {
    addTrackByUrl() {
      const track = {
        url: this.newTrack.trim(),
        title: this.newTrack.split('/').pop() || 'Unknown Track',
      };
      this.$emit('addTrack', track);
      this.newTrack = '';
    },
    addTrackByFile() {
      const file = this.$refs.fileInput.files[0];
      console.log(file);
      if (file) {
        const track = {
          url: URL.createObjectURL(file),
          title: file.name,
        };
        this.$emit('addTrack', track);
      }
    },
  },
};
</script>

<template>
  <section class="new-track-section">
    <div class="add-track">
      <label for="track-method">Add Track</label>
      <select v-model="trackMethod">
        <option value="url">By URL</option>
        <option value="local">Via File Upload</option>
      </select>

      <div v-if="trackMethod === 'url'">
        <input v-model="newTrack" type="text" placeholder="Provide URL" />
        <button @click="addTrackByUrl" :disabled="!newTrack.trim()">Add by URL</button>
      </div>

      <div v-else>
        <input ref="fileInput" type="file" />
        <button @click="addTrackByFile">Add File</button>
      </div>
    </div>
  </section>
</template>