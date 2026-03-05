import {
	SshHostSnippet,
	SshPasswordSnippet,
	SshPortSnippet,
	SshUserSnippet,
} from '@/features/instance-ssh-snippets'
import { type CreatedInstanceCredentials } from '../store'

type SshCredentialsStepProps = {
	credentials: CreatedInstanceCredentials
}

export const SshCredentialsStep = ({
	credentials,
}: SshCredentialsStepProps) => (
	<div className='col w-full gap-3'>
		<SshUserSnippet value={credentials.sshUsername} />
		<SshPasswordSnippet value={credentials.sshPassword} />
		<div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
			<SshHostSnippet value={credentials.sshHost} />
			<SshPortSnippet value={credentials.sshPort} />
		</div>
	</div>
)
