import cn from 'classnames'
import {useContext, useEffect, useState} from 'react'
import {GlobalContext} from '../../context/GlobalContext'
import {ReactComponent as CrossIcon} from '../../assets/icons/cross.svg'
import {Button, Input} from '../../shared/components'
import {BUTTON_APPEARANCE} from '../../shared/constants'
import s from './EventModal.module.scss'

export const EventModal = () => {
    const {
              setShowEventModal,
              daySelected,
              dispatchCallEvent,
              eventSelected,
              modalPosition
          } = useContext(GlobalContext)
    
    const [title, setTitle] = useState(eventSelected?.title || '')
    const [date, setDate] = useState(eventSelected?.date || '')
    const [description, setDescription] = useState(eventSelected?.description || '')
    const [members, setMembers] = useState(eventSelected?.members || '')
    
    useEffect(() => {
        setTitle(eventSelected?.title || '')
        setDate(eventSelected?.date || '')
        setDescription(eventSelected?.description || '')
        setMembers(eventSelected?.members || '')
    }, [daySelected, eventSelected])
    
    const handleCloseEventModal = (e) => {
        e.preventDefault()
        setShowEventModal(false)
    }
    
    const handleDeleteEvent = (e) => {
        dispatchCallEvent({type: 'delete', payload: eventSelected})
        handleCloseEventModal(e)
    }
    
    const isNewEvent = !eventSelected
    
    const handleSubmit = (e) => {
        const event = {
            id: eventSelected?.id || Date.now(),
            title,
            date: daySelected,
            members,
            description
        }
        
        if (!isNewEvent) {
            dispatchCallEvent({type: 'update', payload: event})
        } else {
            dispatchCallEvent({type: 'push', payload: event})
        }
        handleCloseEventModal(e)
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
                <form className={stylesForm}>
                    <Button
                        appearance={BUTTON_APPEARANCE.CANCEL}
                        onClick={handleCloseEventModal}
                    >
                        <CrossIcon/>
                    </Button>
                    <div className={s.inputs}>
                        <Input
                            value={title}
                            type="text"
                            name="title"
                            classNameReadonly={s.title}
                            placeholder="Событие"
                            readonly={!isNewEvent}
                            onChange={(e) => setTitle(e.target.value)}
                            handleReset={() => setTitle('')}
                        />
                        <Input
                            value={date || daySelected}
                            type="text"
                            name="date"
                            classNameReadonly={s.date}
                            placeholder="День, месяц, год"
                            readonly={!isNewEvent}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <Input
                            value={members}
                            type="text"
                            name="members"
                            classNameReadonly={s.members}
                            placeholder="Имена участников"
                            readonly={!isNewEvent}
                            onChange={(e) => setMembers(e.target.value)}
                            handleReset={() => setMembers('')}
                        />
                    </div>
                    <textarea
                        value={description}
                        className={s.description}
                        name="description"
                        id="desc"
                        placeholder="Описание"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className={s.buttons}>
                        <Button
                            type="submit"
                            appearance={BUTTON_APPEARANCE.EXTRA_BUTTON}
                            onClick={handleSubmit}
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