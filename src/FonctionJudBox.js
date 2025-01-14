const props = defineProps({
    titre: String,
    index: Number
  })
  
  const emit = defineEmits(['remove', 'play']);
  
  function removeMusic() {
    emit('remove', props.index);
  }
  
  function playMusic() {
    emit('play', props.index);
  }
  