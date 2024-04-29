<script lang="ts">
export default {
  abstract: true,
  props: {
    to: [String, HTMLElement],
    disabled: Boolean,
  },
  data() {
    let nonReactive = {
      original: undefined,
      dumb: undefined,
      el: undefined,
      originalIndex: 0,
    } as {
      original?: HTMLElement
      dumb?: Node
      el?: Node
      originalIndex: number
    }
    Object.preventExtensions(nonReactive)
    return nonReactive
  },
  mounted() {
    let children = this.$slots.default || []
    let el = children[0].elm
    let { original, originalIndex } = this.$data
    if (!el) return
    this.el = el
    this.$watch(
      () => [this.to, this.disabled],
      () => {
        if (this.disabled) {
          // restore
          original?.insertBefore(el, original.childNodes[originalIndex])
          this.dumb?.parentNode?.removeChild(this.dumb)
          return
        } else {
          // preserve
          if (!original) {
            original = el?.parentElement || undefined
            if (original) originalIndex = Array.prototype.findIndex.call(original.childNodes, (v) => v === el)
          }
          if (!original) return
          let targetEl = typeof this.to === 'string' ? document.querySelector(this.to) : this.to
          if (!targetEl) return
          // teleport
          this.dumb = document.createComment(' teleport ')
          original.insertBefore(this.dumb, original.childNodes[originalIndex])
          targetEl.append(el)
        }
      },
      {
        immediate: true,
      },
    )
  },
  beforeDestroy() {
    if (this.el) this.el.parentNode?.removeChild(this.el)
  },
  render(h) {
    let first = this.$slots.default?.[0]
    return first
  },
}
</script>
