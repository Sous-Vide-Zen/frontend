"use client";
/* баги */
// смотри что можно сделать с типизацией в этом файле
{/* в компоненте летит ошибка по ref */ }
import Image from "next/image"
import Button from "@/components/ui/Button/Button"
import Input from "@/components/ui/Input/Input"
import { Controller, useForm } from "react-hook-form"
import styles from './user-data-form.module.scss'
import { useRouter } from 'next/navigation'
import Layout from "@/components/layout/layout"
import { useEffect, useRef, useState } from "react"
import Select from 'react-select'
import { resultCountry } from "@/helpers/setCountries"
import { customStyles } from "@/helpers/customStylesFromReactSelect"
import { Loader } from "@/components/ui/Loader/Loader"
import { PatternFormat } from 'react-number-format'
import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { fetchDataUser, fetchFormDataUser } from "@/store/features/user/user.actions";
import { IDataForm } from "./user-data-form.types";




export default function Registration() {

    const router = useRouter()
    const dispatch = useAppDispatch()
    // тут надо использовать userApi
    // const { username } = useAppSelector(state => state.userDateMe.user)
    // const { isError, isLoaded, success } = useAppSelector(state => state.userFormDataEdit)
    const username = ''
    const isError = false
    const isLoaded = false
    const success = false

    const ref = useRef<HTMLInputElement>(null);
    /* блок для теста монтирования */
    const [mount, setMount] = useState<boolean>(false)
    /* конец */


    /* блок для прелоадера картинки */
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState();

    /* функция для получения картинки */
    const saveFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files[0]);
    };

    const handlePick = (e: any) => {
        e.preventDefault()
        if (ref.current) {
            ref.current.click();
        }
    };

    useEffect(() => {
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        }
        reader.readAsDataURL(file);
    }, [file]);

    /* */

    /*блок для проверки монтирования компонента */
    useEffect(() => {
        setMount(true)
        // понаблюдай за первой загрузкой, как будто там не авторизованный пользователь прилетает
        // dispatch(fetchDataUser())
    }, [dispatch, mount])
    /* end */

    useEffect(() => {
        if (success === true) {
            router.push('/')
        }
    }, [router, success])

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
        control
    } = useForm<IDataForm>({
        defaultValues: {
            display_name: '',
            first_name: '',
            last_name: '',
            phone: '+79999999999',
            country: '',
            city: '',
            bio: '',
            avatar: ''
        },
        mode: "onBlur"
    });
    const onSubmit = (dataFromInput: IDataForm) => {
        // dispatch(fetchFormDataUser({ username: username, dataFromInput, avatar: file }))
    };

    return (
        <Layout sidebar={false} isSearch={false}>
            <div></div>
            {/* в данном случае моунт использую, для фикса ошибки конфликта сервера и клиента с айдишниками*/}
            {mount === true ?
                <div className={styles.container}>
                    <div className={styles.innerForm}>
                        <p className={styles.innerForm_paragraph}>Расскажите о себе</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label> Никнейм
                                <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                    <Input
                                        register={register}
                                        name="display_name"
                                        type="text"
                                        placeholder="Никнейм"
                                        options={{
                                            maxLength: {
                                                message: "Поле не должно содержать более 30 символов",
                                                value: 30,
                                            }
                                        }}
                                        error={errors?.display_name?.message}
                                    />
                                </div>
                            </label>
                            <label>Имя
                                <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                    <Input
                                        register={register}
                                        name="first_name"
                                        type="text"
                                        placeholder="Иван"
                                        options={{
                                            maxLength: {
                                                message: "Поле не должно содержать более 30 символов",
                                                value: 30,
                                            },
                                        }}
                                        error={errors?.first_name?.message || isError?.first_name && isError?.first_name[0]}
                                    />
                                    {/* { && <p style={{ color: 'var(--input-invalid)', textAlign: 'center' }}>Поле имени заполнено неверно</p>} */}
                                </div>
                            </label>
                            <label>Фамилия
                                <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                    <Input
                                        register={register}
                                        name="last_name"
                                        type="text"
                                        placeholder="Иванов"
                                        options={{
                                            maxLength: {
                                                message: "Поле не должно содержать более 30 символов",
                                                value: 30,
                                            },
                                        }}
                                        error={errors?.last_name?.message || isError?.last_name && isError?.last_name[0]}
                                    />
                                </div>
                            </label>
                            <label>Телефон
                                <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                    {/* в компоненте летит ошибка по ref */}
                                    <Controller
                                        control={control}
                                        name="phone"
                                        render={({ field }) => (
                                            <PatternFormat className={styles.input} {...field} format="+# (###) ###-####" placeholder="+7 (841) " value="" valueIsNumericString={true} />
                                        )}
                                    />
                                </div>
                            </label>
                            <label>Страна
                                <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                    <Controller
                                        control={control}
                                        name="country"
                                        render={({ field }) => (
                                            <Select {...field}
                                                options={resultCountry}
                                                placeholder="Россия"
                                                styles={customStyles}
                                                inputId={Date.now().toString()}
                                            />
                                        )}
                                    />
                                </div>
                            </label>
                            <label>Город
                                <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                    <Input
                                        register={register}
                                        name="city"
                                        type="text"
                                        placeholder="Москва"
                                        options={{
                                            maxLength: {
                                                message: "Поле не должно содержать более 30 символов",
                                                value: 30,
                                            },
                                        }}
                                        error={errors?.city?.message || isError?.city && isError?.city[0]}
                                    />
                                </div>
                            </label>
                            <label>О себе
                                <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                    <Input
                                        register={register}
                                        name="bio"
                                        type="text"
                                        options={{
                                            maxLength: {
                                                message: "Поле не должно содержать более 200 символов",
                                                value: 200,
                                            },
                                        }}
                                        error={errors?.bio?.message}
                                    />
                                </div>
                            </label>

                            {/* скрытый блок превью картинки */}
                            <div className={styles.previewPhoto}>
                                <Controller
                                    control={control}
                                    name="avatar"
                                    render={({ field }) => (
                                        <input
                                            className={styles.hidden}
                                            {...field}
                                            ref={ref}
                                            type="file"
                                            onChange={saveFiles}
                                            accept="image/*,.png,.jpg"
                                        />
                                    )}
                                />
                                {/*  */}
                                <Button className={styles.addPhoto} size={'medium'} color={"primary"} onClick={handlePick}>
                                    Добавить фото +
                                </Button>
                                {previewUrl && <Image className={styles.img} src={previewUrl} alt="Preview" width={150} height={150} />}
                            </div>
                            {/*  */}
                            {/* Доделай кнопку с позиции дизейблед */}
                            {isLoaded === true ? (
                                <p style={{ textAlign: 'center', color: 'aquamarine' }}>
                                    Ждем ответа сервера...
                                </p>
                            ) : null}
                            <Button
                                size={'medium'}
                                color={"primary"}
                                style={{ width: '100%', marginBottom: '24px' }}
                                disabled={
                                    touchedFields.display_name !== true &&
                                        touchedFields.first_name !== true &&
                                        touchedFields.last_name !== true &&
                                        touchedFields.phone !== true &&
                                        touchedFields.country !== true &&
                                        touchedFields.city !== true &&
                                        touchedFields.bio !== true
                                        ? true : false
                                }>
                                Сохранить
                            </Button>

                        </form>
                        {isError && <p style={{ color: 'var(--input-invalid)', textAlign: 'center' }}>Исправьте ошибки в форме</p>}
                        <Button onClick={() => router.push('/')} size={'medium'} color={"secondary"} style={{ width: '100%', marginBottom: '24px' }} >
                            Заполнить позже
                        </Button>
                    </div>
                </div>
                :
                <Loader />
            }
        </Layout >
    );
};

