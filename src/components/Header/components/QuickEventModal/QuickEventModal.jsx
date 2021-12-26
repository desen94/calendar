import dayjs from 'dayjs'
import {useContext} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {ReactComponent as CrossIcon} from '../../../../assets/icons/cross.svg'
import {GlobalContext} from '../../../../context/GlobalContext'
import {Button, Input} from '../../../../shared/components'
import {BUTTON_APPEARANCE, DATE_FORMAT, PATTERNS} from '../../../../shared/constants'
import s from './QuickEventModal.module.scss'

export const QuickEventModal = () => {
    
    const {setShowQuickEventModal, dispatchCallEvent} = useContext(GlobalContext)
    
    const {handleSubmit, setValue, control} = useForm({mode: 'onChange'})
    
    const onSubmit = ({quickEvent}) => {
        const dataArray = quickEvent.split(',')
        const event = {
            id: Date.now(),
            date: dataArray.shift().trim(),
            title: dataArray.shift().trim(),
            members: dataArray.join(',').trim(),
            description: ''
        }
        
        dispatchCallEvent({type: 'push', payload: event})
        
        handleCloseEventModal()
    }
    
    const handleCloseEventModal = (e) => {
        e?.preventDefault()
        setShowQuickEventModal(false)
    }
    
    const handleEnter = (e) => e.key === 'Enter' && handleSubmit(onSubmit)()
    
    const placeholderValue = dayjs().format(DATE_FORMAT.DD_MM_YYYY) + ', заголовок, участники'
    
    return (
        <div className={s.modal}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <Button
                    appearance={BUTTON_APPEARANCE.CANCEL}
                    onClick={handleCloseEventModal}
                >
                    <CrossIcon/>
                </Button>
                <div>
                    <Controller
                        name="quickEvent"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Обязательно для заполнения',
                            pattern: {
                                value: PATTERNS.QUICK_EVENT_DATA,
                                message: 'Формат: ДД.ММ.ГГГГ, название, участники'
                            }
                        }}
                        render={({field, fieldState: {invalid, error}}) => <Input
                            placeholder={placeholderValue}
                            label="Информация о событии"
                            invalid={invalid}
                            error={error}
                            handleReset={() => setValue('quickEvent', '')}
                            onKeyDown={(e) => handleEnter(e)}
                            {...field}
                        />}
                    />
                </div>
                <div className={s.buttons}>
                    <Button
                        type="submit"
                        appearance={BUTTON_APPEARANCE.EXTRA_BUTTON}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Создать
                    </Button>
                </div>
            </form>
        </div>
    )
}