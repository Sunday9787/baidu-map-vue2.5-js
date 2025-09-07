export default {
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
  watch: {}
}

/**
 * @param {Promise<void>[]} middleware
 */
export function compose(middleware) {
  return function(context, next) {
    let index = -1
    function dispatch(i) {
      if (i < index) {
        return Promise.reject(new Error('next() called multiple times'))
      }

      index = i

      let fn = middleware[i]

      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()

      try {
        return new Promise(
          fn(context, function() {
            return dispatch(i + 1)
          })
        )
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return dispatch(0)
  }
}
