<script lang="ts">
let findIndex = Array.prototype.findIndex

export default {
  abstract: true,
  props: {
    to: [String, HTMLElement],
    disabled: Boolean,
  },
  data() {
    let nonReactive = {
      el: undefined,
    } as {
      el?: Node
    }
    Object.preventExtensions(nonReactive)
    return nonReactive
  },
  mounted() {
    let children = this.$slots.default || []
    let rootEl = children[0].elm,
      originalEl = rootEl?.parentElement,
      dumb = document.createComment(' teleport ')

    if (!rootEl || !originalEl) return

    let originalIdx = () => findIndex.call(originalEl.childNodes, (v) => v === this.el)
    this.el = rootEl
    this.$watch(
      () => [this.to, this.disabled],
      () => {
        let targetEl = typeof this.to === 'string' ? document.querySelector(this.to) : this.to
        if (!targetEl) return

        if (this.disabled) {
          // restore
          originalEl.insertBefore(rootEl, originalEl.childNodes[originalIdx()])
          dumb.parentNode?.removeChild(dumb)
          this.el = rootEl
          this.$vnode.elm = this.el
        } else {
          // teleport
          originalEl.insertBefore(dumb, originalEl.childNodes[originalIdx()])
          targetEl.append(rootEl)
          this.el = dumb
          this.$vnode.elm = this.el
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
