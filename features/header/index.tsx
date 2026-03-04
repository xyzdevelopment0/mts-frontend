import { HeaderContainer } from './components/container'
import { HeaderCreateInstanceButton } from './components/create-instance-button'
import { HeaderUser } from './components/user'
import { HeaderWorkspace } from './components/workspace'

export const Header = () => (
	<HeaderContainer>
		<HeaderWorkspace />
		<div className='row-center gap-4'>
			<HeaderCreateInstanceButton />
			<HeaderUser />
		</div>
	</HeaderContainer>
)
