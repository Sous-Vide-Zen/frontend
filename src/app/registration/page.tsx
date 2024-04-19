'use client'
/* баги */
// смотри что можно сделать с типизацией в этом файле
import Image from 'next/image'
import Button from '@/components/ui/Button/Button'
import Input from '@/components/ui/Input/Input'
import { useForm } from 'react-hook-form'
import styles from './registration.module.scss'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { getDataFromActivation } from '@/store/features/user/user-registration.slice'
import { useAppDispatch, useAppSelector } from '@/store/features/hooks'
import { fetchRegistration } from '@/store/features/user/user.actions'
import Layout from '@/components/layout/layout'
import cn from 'clsx'

export default function Registration() {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { isError, isLoaded, success } = useAppSelector(
		(state) => state.userRegistration,
	)

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, touchedFields },
	} = useForm({
		mode: 'onBlur',
	})
	const onSubmit = (dataFromInput: any) => {
		dispatch(getDataFromActivation(dataFromInput))
		dispatch(fetchRegistration(dataFromInput))
	}
	console.log(
		'errors',
		errors,
		'touchedFields',
		touchedFields,
		'isError',
		isError,
	)
	useEffect(() => {
		console.log(localStorage)
		if (success === true) {
			router.push('/activate-instruction')
		}
	}, [success, errors, router])

	const password = watch('password')

	return (
		<Layout sidebar={false} rightbar={false} isSearch={false}>
			<span className={styles.back} onClick={() => router.push('/')}>
				{`<--`} Назад
			</span>
			<div></div>
			<div className={styles.container}>
				<p className={styles.paragraph}>Добро пожаловать в мир су-вид!</p>
				<div className={styles.innerForm}>
					<p className={styles.innerForm_paragraph}>Регистрация</p>
					<form onSubmit={handleSubmit(onSubmit)}>
						<label>
							Email
							<div style={{ marginTop: '12px', marginBottom: '12px' }}>
								<Input
									className={cn({
										// @ts-ignore
										[styles.errorInput]: isError?.email,
									})}
									register={register}
									touchedFields={touchedFields}
									name="email"
									type="text"
									placeholder="ivanov@gmail.com"
									options={{
										required: 'Обязательное поле',
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
											message: 'Введите корректный ящик',
										},
									}}
									error={errors?.email?.message}
								/>
							</div>
							{/* @ts-ignore */}
							{isError?.email && (
								<p style={{ color: 'var(--input-invalid)' }}>
									Пользователь с таким email уже есть
								</p>
							)}
						</label>
						<label>
							Пароль
							<div style={{ marginTop: '12px', marginBottom: '24px' }}>
								<Input
									register={register}
									name="password"
									type="password"
									placeholder="*********"
									options={{
										required: 'Обязательное поле',
										minLength: {
											message: 'Минимальная длина 8 символов',
											value: 8,
										},
										validate: {
											number: (value) =>
												/\d/.test(value) ||
												'Пароль должен содержать хотя бы одну цифру!',
											noRussianChars: (value) =>
												!/[А-Яа-яЁё]/.test(value) ||
												'Используйте только латиницу!',
											letter: (value) =>
												/[A-Za-z]/.test(value) ||
												'Пароль должен содержать хотя бы одну букву!',
											upperLetter: (value) =>
												/[A-Z]/.test(value) ||
												'Пароль должен содержать одну заглавную букву!',
											symbol: (value) =>
												/[\W_]/.test(value) ||
												'Пароль должен содержать хотя бы один специальный символ (!@#$%^&*).',
										},
									}}
									error={errors?.password?.message}
								/>
							</div>
						</label>
						<label>
							Введите пароль еще раз
							<div style={{ marginTop: '12px', marginBottom: '24px' }}>
								<Input
									register={register}
									name="password2"
									type="password"
									placeholder="*********"
									options={{
										required: 'Обязательное поле',
										validate: (value) =>
											value === password || 'Пароли не совпадают',
									}}
									error={errors?.repeat_password?.message}
								/>
							</div>
						</label>
						<Button
							disabled={
								errors?.email?.message?.length > 0 ||
								errors?.password?.message?.length > 0 ||
								errors?.password2?.message?.length > 0 ||
								isError ||
								touchedFields.email !== true ||
								touchedFields.password !== true ||
								touchedFields.password2 !== true
									? true
									: false
							}
							color={'primary'}
							style={{ width: '100%', marginBottom: '24px' }}
							size={'big'}
						>
							Зарегистрироваться
						</Button>
						{isLoaded === true ? (
							<p style={{ textAlign: 'center', color: 'aquamarine' }}>
								Ждем ответа сервера...
							</p>
						) : null}
					</form>
					<p className={styles.alreadyHaveAccount}>
						У вас уже есть аккаунт ?{' '}
						<span
							className={styles.login}
							onClick={() => router.push('/activate-page')}
						>
							Войти в аккаунт
						</span>
					</p>
					<div className={styles.innerLine}>
						<hr className={styles.line} style={{ marginRight: '5px' }} />
						<span>или</span>
						<hr className={styles.line} style={{ marginLeft: '5px' }} />
					</div>
					<div className={styles.innerImg}>
						<button
							onClick={() =>
								router.push('http://127.0.0.1:8000/api/v1/login/vk-oauth2/')
							}
						>
							<Image
								style={{ marginRight: '12px' }}
								src="/img/vk.svg"
								width={38}
								height={38}
								alt="vk"
							/>
						</button>

						<button
							onClick={() =>
								router.push('http://127.0.0.1:8000/api/v1/login/yandex-oauth2/')
							}
						>
							<Image src="/img/ya.svg" width={38} height={38} alt="yandex" />
						</button>
					</div>
				</div>
			</div>
		</Layout>
	)
}
