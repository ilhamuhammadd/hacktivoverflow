<template>
  <div class="home">
    <Post />
  </div>
</template>

<script>
import Post from '@/components/Posts.vue'

export default {
  name: 'home',
  components: {
    Post
  },
};
</script>
