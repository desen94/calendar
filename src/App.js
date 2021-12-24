import dayjs from 'dayjs'
import {useContext, useEffect, useState} from 'react'
import s from './App.module.scss'
import {ControllerBar} from './components/ControllerBar'
import {EventModal} from './components/EventModal'
import {Header} from './components/Header'
import {Month} from './components/Month'
import {GlobalContext} from './context/GlobalContext'
import './styles/globals.scss'
import {getMonth} from './utils/generateDays'

export const App = () => {
    
    const [currentMonth, setCurrentMonth] = useState(getMonth())
    const {watchingMonth, showEventModal} = useContext(GlobalContext)
    
    useEffect(() => {
        setCurrentMonth(getMonth(dayjs(watchingMonth)))
    }, [watchingMonth])
    
    return (
        <div className={s.container}>
            {!!showEventModal && <EventModal/>}
            <Header>
            </Header>
            <div className={s.wrapper}>
                <ControllerBar/>
                <Month month={currentMonth}/>
            </div>
        </div>
    )
}