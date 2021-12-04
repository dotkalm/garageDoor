import { FallbackProps } from './ErrorBoundary'
export default function ErrorFallback(props: FallbackProps){
	if(props && props.error){
		const { error } = props
		if(error instanceof Error){
			return(
				<div>
					SOMETHING IS WRONG
					{error.message}
				</div>
			)
		}
	}
	return <div>uncaught</div>
}
