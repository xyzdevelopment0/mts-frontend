import { HeaderContainer } from '@repo/shell/header-container'
import { HeaderUser } from './components/user'
import { HeaderWorkspace } from './components/workspace'

export const Header = () => (
	<HeaderContainer>
		<HeaderWorkspace />
		<HeaderUser />
	</HeaderContainer>
)
