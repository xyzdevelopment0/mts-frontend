import { HeaderContainer } from './components/container'
import { HeaderUser } from './components/user'
import { HeaderWorkspace } from './components/workspace'

export const Header = () => (
	<HeaderContainer>
		<HeaderWorkspace />
		<HeaderUser />
	</HeaderContainer>
)
