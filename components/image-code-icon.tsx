import {
	SiAlpinelinux,
	SiAlpinelinuxHex,
	SiDocker,
	SiDockerHex,
	SiPostgresql,
	SiPostgresqlHex,
	SiUbuntu,
	SiUbuntuHex,
} from '@icons-pack/react-simple-icons'
import { cn } from '@/utils/cn'

const FALLBACK_IMAGE_ICON_NAME = 'docker'

const IMAGE_ICON_BY_NAME = {
	alpine: { Icon: SiAlpinelinux, color: SiAlpinelinuxHex },
	docker: { Icon: SiDocker, color: SiDockerHex },
	postgres: { Icon: SiPostgresql, color: SiPostgresqlHex },
	ubuntu: { Icon: SiUbuntu, color: SiUbuntuHex },
} as const

const IMAGE_CODE_ICON_NAME_BY_TOKEN: Record<
	string,
	keyof typeof IMAGE_ICON_BY_NAME
> = {
	alpine: 'alpine',
	docker: 'docker',
	postgres: 'postgres',
	postgresql: 'postgres',
	ubuntu: 'ubuntu',
}

const parseImageCodeTokens = (value: string) =>
	value
		.toLowerCase()
		.split(/[^a-z0-9]+/)
		.filter(Boolean)

const resolveImageIconName = (code?: string | null) => {
	if (!code) {
		return FALLBACK_IMAGE_ICON_NAME
	}

	const tokens = parseImageCodeTokens(code)
	const candidates = [tokens.join(''), ...tokens]

	for (const candidate of candidates) {
		const iconName = IMAGE_CODE_ICON_NAME_BY_TOKEN[candidate]
		if (iconName) {
			return iconName
		}
	}

	return FALLBACK_IMAGE_ICON_NAME
}

type ImageCodeIconProps = {
	code?: string | null
	className?: string
}

export const ImageCodeIcon = ({ code, className }: ImageCodeIconProps) => {
	const iconName = resolveImageIconName(code)
	const { Icon, color } = IMAGE_ICON_BY_NAME[iconName]

	return (
		<Icon
			aria-hidden
			size={18}
			color={color}
			className={cn('h-[18px] w-[18px] shrink-0', className)}
		/>
	)
}
