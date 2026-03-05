import {
	SshHostSnippet,
	SshPasswordSnippet,
	SshPortSnippet,
	SshUserSnippet,
} from '@/features/instance-ssh-snippets'

type SshAccessProps = {
	sshUser: string
	sshPass: string
	sshHost: string
	sshPort: number
}

export const SshAccess = ({
	sshUser,
	sshPass,
	sshHost,
	sshPort,
}: SshAccessProps) => (
	<div className='col gap-3'>
		<SshUserSnippet value={sshUser} />
		<SshPasswordSnippet value={sshPass} />
		<SshHostSnippet value={sshHost} />
		<SshPortSnippet value={sshPort} />
	</div>
)
