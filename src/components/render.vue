<script>
export default {
  data(){
    return {
      demo: "hhh",
      isRed: true
    }
  },
  created() {
    console.log("demo",this.demo)
  },
  render() {
    const h = this.h
    return h('div',  {
      'class': {
        'is-red': this.isRed
      }
    }, [
      h('p', 'Example Text'),
      h('p', 'Example Textsss')

    ])
  }
}
</script>
