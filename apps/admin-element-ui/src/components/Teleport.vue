<script lang="ts">
export default {
  abstract: true,
  props: {
    to: [String, HTMLElement],
    disabled: Boolean,
  },
  data() {
    let nonReactive = {
      original: undefined as HTMLElement | undefined,
      originalIndex: 0,
    }
    Object.preventExtensions(nonReactive)
    return nonReactive
  },
  mounted() {
    let children = this.$slots.default || []
    let el = children[0].elm
    let { original, originalIndex } = this.$data
    if (!el) return

    this.$watch(
      () => [this.to, this.disabled],
      () => {
        if (this.disabled) {
          // restore
          if (original) original.insertBefore(original.childNodes[originalIndex], el)
          return
        } else {
          // preserve
          if (!original) {
            original = el?.parentElement || undefined
            if (original) originalIndex = Array.prototype.findIndex.call(original.childNodes, (v) => v === el)
          } else return
          let targetEl = typeof this.to === 'string' ? document.querySelector(this.to) : this.to
          targetEl?.append(el)
        }
      },
      {
        immediate: true,
      },
    )
  },
  render(h) {
    let first = this.$slots.default?.[0]
    return first
  },
}
</script>
