import PerfectScrollbar from 'perfect-scrollbar'

// Requires a scrollContainer reference on an element you want to be scrollable
export default {
  beforeDestroy () {
    this.$refs.scrollContainer.scrollTop = 0
    this.scrollContainer.destroy()
    window.removeEventListener('resize', this.updateScrollSize)
  },

  data () {
    return {
      scrollContainer: null
    }
  },

  methods: {
    updateScrollSize () {
      this.scrollContainer.update()
    }
  },

  mounted () {
    this.scrollContainer = new PerfectScrollbar(this.$refs.scrollContainer, {
      maxScrollbarLength: 100
    })

    window.addEventListener('resize', this.updateScrollSize)
  }
}
