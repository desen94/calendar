import {createContext} from 'react'

export const GlobalContext = createContext({
    watchingMonth: '',
    setWatchingMonth: () => {},
    showEventModal: false,
    setShowEventModal: () => {},
    daySelected: 0,
    setDaySelected: () => {},
    dispatchCallEvent: ({type, payload}) => {},
    savedEvents: [],
    eventSelected: null,
    setEventSelected: () => {},
    modalPosition: {},
    setModalPosition: () => {},
    showQuickEventModal: false,
    setShowQuickEventModal: ()=> {}
})