<template>
  <div class="about">
    <h1>About page</h1>
  </div>
</template>

<script lang="ts">
import User from '~/api/user'

export default defineComponent({
  data() {
    return {
      username: '',
      password: '',
    }
  },
  created() {
    this.login()
  },
  methods: {
    async login() {
      const res = await User.login(this.username, this.password)
      console.log(res)
    },
  },
})
</script>

<style lang="scss">
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
    min-height: 100vh;

    h1 {
      color: red;
    }
  }
}
</style>
