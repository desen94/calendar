import cn from 'classnames'
import {useContext} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {ReactComponent as CrossIcon} from '../../assets/icons/cross.svg'
import {GlobalContext} from '../../context/GlobalContext'
import {Button, Input} from '../../shared/components'
import {BUTTON_APPEARANCE, PATTERNS} from '../../shared/constants'
import s from './EventModal.module.scss'

export const EventModal = () => {
    const {
              setShowEventModal,
              daySelected,
              dispatchCallEvent,
              eventSelected,
              modalPosition
          } = useContext(GlobalContext)
    
    const handleCloseEventModal = (e) => {
        e?.preventDefault()
        setShowEventModal(false)
    }
    
    const handleDeleteEvent = (e) => {
        dispatchCallEvent({type: 'delete', payload: eventSelected})
        handleCloseEventModal(e)
    }
    
    const isNewEvent = !eventSelected
    
    const {register, handleSubmit, setValue, control} = useForm({
        mode: 'onChange',
        defaultValues: {
            title: eventSelected?.title ?? '',
            date: eventSelected?.date ?? daySelected,
            members: eventSelected?.members ?? '',
            description: eventSelected?.description ?? ''
        }
    })
    
    const onSubmit = ({title, date, members, description}) => {
        const event = {
            id: eventSelected?.id || Date.now(),
            title,
            date,
            members,
            description
        }
        
        if (!isNewEvent) {
            dispatchCallEvent({type: 'update', payload: event})
        } else {
            dispatchCallEvent({type: 'push', payload: event})
        }
        
        handleCloseEventModal()
    }
    
    const stylesForm = cn(s.form, s[modalPosition.decoratorVertical], s[modalPosition.decoratorHorizontal])
    
    return (
        <div
            className={s.modalWrapper}
            onClick={handleCloseEventModal}
        >
            <div
                className={s.modal}
                style={modalPosition.modal}
                onClick={e => e.stopPropagation()}
            >
                <form className={stylesForm} onSubmit={handleSubmit(onSubmit)}>
                    <Button
                        appearance={BUTTON_APPEARANCE.CANCEL}
                        onClick={handleCloseEventModal}
                    >
                        <CrossIcon/>
                    </Button>
                    <div className={s.inputs}>
                        <Controller
                            name="title"
                            control={control}
                            rules={{
                                required: 'Обязательно для заполнения',
                                pattern: {
                                    value: PATTERNS.NOT_EMPTY_STRING,
                                    message: 'Укажите корректно название события'
                                }
                            }}
                            render={({field, fieldState: {invalid, error}}) => <Input
                                placeholder="Событие"
                                label="Заголовок события"
                                readonly={!isNewEvent}
                                readonlyStyles={s.title}
                                invalid={invalid}
                                error={error}
                                handleReset={() => setValue('title', '')}
                                {...field}
                            />}
                        />
                        <Controller
                            name="date"
                            control={control}
                            label="Дата события"
                            rules={{
                                required: 'Обязательно для заполнения',
                                pattern: {
                                    value: PATTERNS.DD_MM_YYYY,
                                    message: 'Формат даты должен быть "ДД.ММ.ГГГГ"'
                                }
                            }}
                            render={({field, fieldState: {invalid, error}}) => <Input
                                placeholder="День, месяц, год"
                                label="Дата события"
                                readonly={!isNewEvent}
                                readonlyStyles={s.date}
                                invalid={invalid}
                                error={error}
                                {...field}
                            />}
                        />
                        <Controller
                            name="members"
                            control={control}
                            render={({field}) => <Input placeholder="Участники"
                                                        label="Участники события"
                                                        readonly={!isNewEvent}
                                                        readonlyStyles={s.members}
                                                        handleReset={() => setValue('members', '')}
                                                        {...field}
                            />}
                        />
                    </div>
                    
                    <label htmlFor="description" className={s.visuallyHidden}>Описание</label>
                    <textarea
                        className={s.description}
                        placeholder="Описание"
                        {...register('description')}
                    />
                    
                    <div className={s.buttons}>
                        <Button
                            type="submit"
                            appearance={BUTTON_APPEARANCE.EXTRA_BUTTON}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Готово
                        </Button>
                        <Button
                            type="button"
                            disabled={isNewEvent}
                            appearance={BUTTON_APPEARANCE.EXTRA_BUTTON}
                            onClick={handleDeleteEvent}
                        >
                            Удалить
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}