import { useRouteError } from 'react-router-dom'

export function Component() {
  return <div>:( 404 Not Found</div>
}

Component.displayName = 'ErrorPage'

// export default function ErrorPage() {
//   const error = useRouteError()
//   console.error(error)

//   return (
//     <div id="error-page">
//       <h1>Oops!</h1>
//       <p>Sorry, an unexpected error has occurred.</p>
//       <p>
//         <i>{error.statusText || error.message}</i>
//       </p>
//     </div>
//   )
// }
