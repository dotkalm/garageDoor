import styles from './GarageDoor.module.css'
import { Open, Closed } from './State'
export default function GarageDoor(){
	return(
		<div className={styles.garageDoor}>
			<Closed/>
		</div>
	)
}
