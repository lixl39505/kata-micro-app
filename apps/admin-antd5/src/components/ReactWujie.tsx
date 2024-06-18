import { useEffect, useRef } from 'react'
import { startApp, destroyApp, startOptions } from 'wujie'

const ReactWujie: React.FC<{ width?: string; height?: string } & Omit<startOptions, 'el'>> = ({
  width,
  height,
  ...props
}) => {
  let myRef = useRef<HTMLDivElement>(null)
  let queue = useRef<Promise<void | Function>>(Promise.resolve())

  useEffect(() => {
    queue.current = queue.current.then(() => startApp({ ...props, el: myRef.current! }))

    return () => {
      queue.current = queue.current.then(() => destroyApp(props.name))
    }
  }, [props.name])

  return <div style={{ width, height }} ref={myRef} />
}

export default ReactWujie
