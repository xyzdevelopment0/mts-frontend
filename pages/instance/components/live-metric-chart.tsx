'use client'

import { useEffect, useState } from 'react'
import { Liveline, type LivelinePoint } from 'liveline'
import { Label } from './label'

type LiveMetricChartProps = {
	label: string
	color: string
	min: number
	max: number
	initialValue: number
	maxStep: number
}

const SAMPLE_INTERVAL_MS = 5000
const SAMPLE_INTERVAL_SECONDS = SAMPLE_INTERVAL_MS / 1000
const HISTORY_LENGTH = 60

const clamp = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max)

const nextRandomValue = ({
	value,
	min,
	max,
	maxStep,
}: {
	value: number
	min: number
	max: number
	maxStep: number
}) => clamp(value + (Math.random() * 2 - 1) * maxStep, min, max)

const seededRandom = (seed: number) => {
	const number = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
	return number - Math.floor(number)
}

const createInitialState = ({
	initialValue,
	min,
	max,
	maxStep,
}: Pick<LiveMetricChartProps, 'initialValue' | 'min' | 'max' | 'maxStep'>) => {
	const now = Math.floor(Date.now() / 1000)
	const data = Array.from({ length: HISTORY_LENGTH }, (_, index) => {
		const pointsBehind = HISTORY_LENGTH - index - 1
		const time = now - pointsBehind * SAMPLE_INTERVAL_SECONDS
		return { time, value: initialValue }
	})

	for (let index = 1; index < data.length; index += 1) {
		const random = seededRandom(index + initialValue + min + max + maxStep)
		data[index] = {
			time: data[index].time,
			value: clamp(
				data[index - 1].value + (random * 2 - 1) * maxStep,
				min,
				max
			),
		}
	}

	return {
		data,
		value: data[data.length - 1]?.value ?? initialValue,
	}
}

export const LiveMetricChart = ({
	label,
	color,
	min,
	max,
	initialValue,
	maxStep,
}: LiveMetricChartProps) => {
	const [{ data, value }, setState] = useState(() =>
		createInitialState({ initialValue, min, max, maxStep })
	)

	useEffect(() => {
		const intervalId = setInterval(() => {
			setState(previous => {
				const nextValue = nextRandomValue({
					value: previous.value,
					min,
					max,
					maxStep,
				})
				const nextPoint: LivelinePoint = {
					time: Math.floor(Date.now() / 1000),
					value: nextValue,
				}

				return {
					value: nextValue,
					data: [...previous.data.slice(-(HISTORY_LENGTH - 1)), nextPoint],
				}
			})
		}, SAMPLE_INTERVAL_MS)

		return () => clearInterval(intervalId)
	}, [max, maxStep, min])

	return (
		<div className='col lg:flex-1'>
			<Label>{label}</Label>
			<div className='h-56'>
				<Liveline
					data={data}
					value={value}
					color={color}
					theme='light'
					window={HISTORY_LENGTH * SAMPLE_INTERVAL_SECONDS}
					fill={false}
					badge={false}
					momentum={false}
				/>
			</div>
		</div>
	)
}
