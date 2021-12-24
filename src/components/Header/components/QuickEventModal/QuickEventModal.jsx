import cn from 'classnames'
import dayjs from 'dayjs'
import {useContext, useEffect, useState} from 'react'
import {GlobalContext} from '../../../../context/GlobalContext'
import {DATE_FORMAT} from '../../../../shared/constants'
import {ReactComponent as CrossIcon} from '../../../../assets/icons/cross.svg'
import {Button, Input} from '../../../../shared/components'
import {BUTTON_APPEARANCE} from '../../../../shared/constants'
import s from './QuickEventModal.module.scss'

export const QuickEventModal = () => {
    
    const {setShowQuickEventModal, dispatchCallEvent} = useContext(GlobalContext)
    
    const [eventData, setEventData] = useState('')
    
    useEffect(() => {
    
    }, [])
    
    const handleCloseEventModal = (e) => {
        e?.preventDefault()
        setShowQuickEventModal(false)
    }
    
    const handleSubmit = (e) => {
        const dataArray = eventData.split(',')
        const event = {
            id: Date.now(),
            date: dataArray[0],
            title: dataArray[1],
            members: dataArray[2],
            description: ''
        }
        // TODO: нормально распаристь строку в объект
        
        dispatchCallEvent({type: 'push', payload: event})
        
        handleCloseEventModal(e)
    }
    
    const handleEnter = (e) => {
        e.key === 'Enter' && handleSubmit()
    }
    
    const placeholder = dayjs().format(DATE_FORMAT.DD_MM_YYYY) + ', заголовок, участники'
    
    const stylesForm = cn(s.form)
    
    return (
        <div className={s.modal}>
            <form className={stylesForm}>
                <Button
                    appearance={BUTTON_APPEARANCE.CANCEL}
                    onClick={handleCloseEventModal}
                >
                    <CrossIcon/>
                </Button>
                <div>
                    <Input
                        value={eventData}
                        type="text"
                        name="event-data"
                        placeholder={placeholder}
                        onChange={(e) => setEventData(e.target.value)}
                        handleRemove={() => setEventData('')}
                        onKeyDown={(e) => handleEnter(e)}
                    />
                </div>
                <div className={s.buttons}>
                    <Button
                        type="submit"
                        appearance={BUTTON_APPEARANCE.EXTRA_BUTTON}
                        onClick={handleSubmit}
                    >
                        Создать
                    </Button>
                </div>
            </form>
        </div>
    )
}