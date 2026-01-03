import { useCallback, useState } from 'react'

type UseApiMutationResultCallbackT<Result, Args> = Args extends undefined
  ? () => Promise<Result extends undefined ? undefined : Result>
  : (args: Args) => Promise<Result extends undefined ? undefined : Result>

type UseApiMutationResultT<Result, Args> = [
  UseApiMutationResultCallbackT<Result, Args>,
  { loading: boolean; data: Result | null; error: unknown },
]

const useApiMutation = <Result = undefined, Args = undefined>(
  callback: UseApiMutationResultCallbackT<Result, Args>,
  {
    errorHandler = defaultErrorHandler,
    onSuccess,
  }: { errorHandler?: (error: unknown) => void; onSuccess?: (data?: Result) => void } = {},
): UseApiMutationResultT<Result, Args> => {
  const [data, setData] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const mutate = useCallback(
    async (args: Args) => {
      setLoading(true)
      setError(null)
      try {
        const data = await callback(args)
        onSuccess?.(data)
        //eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- rule bug
        if (data !== undefined) setData(data)
        return data
      } catch (e) {
        setError(e)
        errorHandler(e)
        return null
      } finally {
        setLoading(false)
      }
    },
    [callback, errorHandler, onSuccess],
  )

  return [mutate as UseApiMutationResultCallbackT<Result, Args>, { loading, data, error }]
}

function defaultErrorHandler(error: unknown): void {
  //eslint-disable-next-line @typescript-eslint/only-throw-error -- it's ok
  throw error
}

export default useApiMutation
