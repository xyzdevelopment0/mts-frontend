import { Home } from '@/pages/home'

type HomePageProps = Readonly<{
	searchParams: Promise<Record<string, string | string[] | undefined>>
}>

const HomePage = async ({ searchParams }: HomePageProps) => (
	<Home searchParams={await searchParams} />
)

export default HomePage
