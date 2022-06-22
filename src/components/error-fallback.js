export default function ErrorFallback({error, resetErrorBoundary}) {
  console.log("Error inside errorFallback");
  console.log(error);
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}