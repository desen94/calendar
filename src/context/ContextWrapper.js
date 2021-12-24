import dayjs from 'dayjs'
import {useEffect, useReducer, useState} from 'react'
import {GlobalContext} from './GlobalContext'

function savedEventsReducer(state, {type, payload}) {
    switch (type) {
        case 'push':
            return [...state, payload]
        case 'update':
            return state.map(event => event.id === payload.id ? payload : event)
        case 'delete':
            return state.filter(event => event.id !== payload.id)
        default:
            throw new Error()
    }
}

function initEvents() {
    return JSON.parse(localStorage.getItem('savedEvents')) ?? []
}

export default function ContextWrapper({children}) {
    const [watchingMonth, setWatchingMonth] = useState(dayjs())
    const [showEventModal, setShowEventModal] = useState(false)
    const [showQuickEventModal, setShowQuickEventModal] = useState(false)
    const [daySelected, setDaySelected] = useState('')
    const [eventSelected, setEventSelected] = useState('')
    const [modalPosition, setModalPosition] = useState('')
    
    const [savedEvents, dispatchCallEvent] = useReducer(savedEventsReducer, [], initEvents)
    
    useEffect(()=> {
        localStorage.setItem('savedEvents', JSON.stringify(savedEvents))
    }, [savedEvents])
    
    useEffect(()=> {
        !showEventModal && setEventSelected(null)
    },[showEventModal])
    
    return (
        <GlobalContext.Provider
            value={{
                watchingMonth,
                setWatchingMonth,
                showEventModal,
                setShowEventModal,
                showQuickEventModal,
                setShowQuickEventModal,
                daySelected,
                setDaySelected,
                dispatchCallEvent,
                savedEvents,
                eventSelected,
                setEventSelected,
                modalPosition,
                setModalPosition
            }}>
            {children}
        </GlobalContext.Provider>
    )
}