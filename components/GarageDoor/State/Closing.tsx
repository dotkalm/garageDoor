import { duration } from 'fixtures/animation'

export default function Closing(){
	return(
		<svg viewBox="0 0 10 4" xmlns="http://www.w3.org/2000/svg" >
			<polygon points="">
				<animate 
					attributeName="points" 
					dur={`${duration}s`}
					fill="freeze"
					from="0,0, 10,0, 9,1, 1,1"
					to="0,0, 10,0, 10,4, 0,4"
				/>
			</polygon>
		</svg>
	)
}
