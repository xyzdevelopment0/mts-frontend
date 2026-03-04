# Project engineering instructions

## Core principles

- Prefer the simplest, cleanest, and most elegant solution.
- Reduce duplication and avoid unnecessary boilerplate.
- Remove unused and legacy code when making changes.
- Do not add code comments.
- Use Conventional Commits for all commit messages.

## React style

- Use arrow functions for React functional components.
- If a component only returns JSX, use implicit return.

Preferred:

```tsx
export const Input = (props: React.ComponentProps<'input'>) => (
	<input {...props} />
)
```

Avoid:

```tsx
export function Input(props: React.ComponentProps<'input'>) {
	return <input {...props} />
}
```

## Tailwind class composition

- For long class lists, use `cn` from `@/utils/cn`.
- Split classes into logical groups and pass them as separate `cn(...)`
  arguments.
- Keep `className` as the final argument.

Example:

```tsx
import { cn } from '@/utils/cn'

export const Button = ({
	className,
	...props
}: React.ComponentProps<'button'>) => (
	<button
		className={cn(
			'flex items-center justify-center whitespace-nowrap',
			'font-medium transition-all',
			'bg-purple-4 text-white enabled:hover:opacity-90',
			'focus-visible:ring-purple-2 focus-visible:ring-2',
			className
		)}
		{...props}
	/>
)
```

## Module structure

- `features/` is for complex reusable modules.
- A feature module typically includes:

```text
features/<domain>/<module>/
- index.ts
- store.ts
- hooks/
- components/
```

- `pages/` can use a similar structure, but these modules are
  route/page-specific and not reusable shared features.

```text
pages/<domain>/<page>/
- index.ts
- store.ts
- hooks/
- components/
```

## Store pattern example

Reference style for `store.ts`:

```ts
import { create } from 'zustand'
import { createStoreWithContext } from '@/utils/create-store-with-context'

interface State {
	login: string
	password: string
}

interface Actions {
	set: (state: Partial<State>) => void
}

const createStore = () =>
	create<State & Actions>(set => ({
		login: '',
		password: '',
		set: state => set({ ...state }),
	}))

export const { LoginProvider, useLogin } = createStoreWithContext(
	'login',
	createStore
)
```
