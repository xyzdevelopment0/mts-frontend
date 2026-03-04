'use client'

import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import type { ReactNode } from 'react'
import type { StoreApi } from 'zustand'
import { useStore } from 'zustand'

type Capitalize<S extends string> = S extends `${infer First}${infer Rest}`
	? `${Uppercase<First>}${Rest}`
	: S

type StoreRecord = Record<string, unknown>

const isSerializable = (value: unknown): boolean => {
	if (typeof value === 'function') return false
	if (typeof value !== 'object' || value === null) return true

	const candidate = value as { current?: unknown; triggerRef?: unknown }
	return candidate.current === undefined && candidate.triggerRef === undefined
}

const extractSerializableProps = <T extends StoreRecord>(
	props: T
): StoreRecord =>
	Object.fromEntries(
		Object.entries(props).filter(entry => isSerializable(entry[1]))
	)

const getCustomizedProps = <T extends StoreRecord>(
	state: T,
	props: StoreRecord
): Set<string> =>
	new Set(
		Object.entries(props)
			.filter(entry => !isSerializable(entry[1]))
			.filter(([key, value]) => state[key as keyof T] !== value)
			.map(([key]) => key)
	)

export function createContextStore<
	StoreName extends string,
	T extends StoreRecord,
	P extends StoreRecord,
>(storeName: StoreName, storeFactory: (props: P) => StoreApi<T>) {
	const Context = createContext<StoreApi<T> | null>(null)

	const Provider = ({ children, ...props }: P & { children: ReactNode }) => {
		const storeProps = props as unknown as P
		const propsRef = useRef<P>(storeProps)
		const serializableProps = useMemo(
			() => extractSerializableProps(storeProps),
			[storeProps]
		)
		const serializablePropsKey = useMemo(
			() => JSON.stringify(serializableProps),
			[serializableProps]
		)
		const [store, setStore] = useState<StoreApi<T>>(() =>
			storeFactory(storeProps)
		)
		const [customizedProps, setCustomizedProps] = useState<Set<string>>(() =>
			getCustomizedProps(store.getState(), storeProps)
		)

		useEffect(() => {
			propsRef.current = storeProps
		}, [storeProps])

		useEffect(() => {
			const nextStore = storeFactory(propsRef.current)
			setStore(nextStore)
			setCustomizedProps(
				getCustomizedProps(nextStore.getState(), propsRef.current)
			)
		}, [serializablePropsKey])

		useEffect(() => {
			const currentState = store.getState()
			const updates = {} as Partial<T>

			Object.entries(storeProps).forEach(([key, value]) => {
				if (
					!isSerializable(value) &&
					!customizedProps.has(key) &&
					currentState[key as keyof T] !== value
				) {
					;(updates as StoreRecord)[key] = value
				}
			})

			if (Object.keys(updates).length > 0) {
				store.setState(updates)
			}
		}, [customizedProps, store, storeProps])

		return <Context.Provider value={store}>{children}</Context.Provider>
	}

	const useStoreHook = () => {
		const store = useContext(Context)
		if (!store) {
			throw new Error(`Store hook must be used within ${storeName} Provider`)
		}
		return useStore(store)
	}

	const capitalizedName = (storeName.charAt(0).toUpperCase() +
		storeName.slice(1)) as Capitalize<StoreName>

	return {
		[`${capitalizedName}Provider`]: Provider,
		[`use${capitalizedName}`]: useStoreHook,
		Context,
	} as {
		[K in `${Capitalize<StoreName>}Provider`]: typeof Provider
	} & {
		[K in `use${Capitalize<StoreName>}`]: typeof useStoreHook
	} & {
		Context: typeof Context
	}
}
