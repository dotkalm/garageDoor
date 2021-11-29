export default function Opening(){
	return(
		<svg viewBox="0 0 10 4" xmlns="http://www.w3.org/2000/svg" >
			<polygon points="">
				<animate 
					attributeName="points" 
					dur="10s" 
					fill="freeze" 
					from="0,0, 10,0, 10,4, 0,4" 
					to="0,0, 10,0, 9,1, 1,1"
				/>
			</polygon>
		</svg>
	)
}
