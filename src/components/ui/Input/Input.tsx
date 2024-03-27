import styles from './Input.module.scss'
import { FC, useState } from 'react'
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'
import cn from 'clsx';
import { EyeIconSVG } from '../ui-kit'

interface InputProps {
	placeholder?: string
	type?: string
	name: string
	className?: string
	error?: any
	touchedFields?: Partial<Readonly<{
		[x: string]: any;
	}>>
	options?: RegisterOptions<FieldValues>
	register: UseFormRegister<FieldValues>
}

const Input: FC<InputProps> = ({
	placeholder,
	error,
	type = 'text',
	name,
	className,
	touchedFields,
	register,
	options,
	...rest
}) => {
	// console.log("error", error, "touchedFields", touchedFields)
	const optionsForm = options
		? { ...register(name, options) }
		: { ...register(name) }

	const isPassword = type === 'password'

	const [typeInput, setTypeInput] = useState(type)
	const handleMouseDown = () => {
		setTypeInput('text')
	}

	const handleMouseUp = () => {
		setTypeInput(type)
	}

	return (
		<div className={className}>
			<div className={styles.input__wrapper}>
				<input
					placeholder={placeholder}
					type={isPassword ? typeInput : type}
					{...optionsForm}
					{...rest}
					className={cn(styles.input, {
						[styles.borderError]: error !== undefined
					})}
				/>
				{error || isPassword ? (
					<div className={styles.input__icons}>
						{isPassword ? (
							<button
								className={styles.input__eye}
								type="button"
								onMouseDown={handleMouseDown}
								onMouseUp={handleMouseUp}
							>
								<EyeIconSVG />
							</button>
						) : null}
					</div>
				) : null}
			</div>
			{error && <span className={styles.error}>{error}</span>}
		</div>
	)
}

export default Input