export default {
  name: 'App',
  created() {
    this.$store.commit('SET_AK', 'bhMVMQd65OqOvtAlffYSrD6QNQMH3w5Z')
  },
  render() {
    return <div id='app'>{this.$slots.default}</div>
  }
}
