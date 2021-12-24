import cn from 'classnames'
import dayjs from 'dayjs'
import React, {useContext, useEffect, useState} from 'react'
import {GlobalContext} from '../../../../context/GlobalContext'
import {DATE_FORMAT} from '../../../../shared/constants'
import {CalcModalPosition} from '../../../../utils/calcModalPosition'
import {Event} from './components/Event'
import s from './Day.module.scss'

export const Day = ({day, rowIndex, columnIndex}) => {
    const {
              setDaySelected,
              setShowEventModal,
              savedEvents,
              setEventSelected,
              setModalPosition,
              daySelected,
              showEventModal
          } = useContext(GlobalContext)
    
    const [dayEvents, setDayEvents] = useState([])
    
    useEffect(() => {
        const events = savedEvents.filter(event => event.date === day.format(DATE_FORMAT.DD_MM_YYYY))
        setDayEvents(events)
    }, [day, savedEvents])
    
    const handleSelectDay = (e) => {
        setModalPosition(CalcModalPosition(e, rowIndex, columnIndex))
        setDaySelected(day.format(DATE_FORMAT.DD_MM_YYYY))
        setShowEventModal(true)
    }
    
    const stylesDay = day.format(DATE_FORMAT.DD_MM_YYYY) === dayjs().format(DATE_FORMAT.DD_MM_YYYY) ? cn(s.day, s.today) : cn(s.day)
    const isActiveDay = day.format(DATE_FORMAT.DD_MM_YYYY) === daySelected && showEventModal
    const stylesCell = cn(s.cell, dayEvents.length && s.filled, isActiveDay && s.active)
    
    const dayNumber = !rowIndex ? day.format(DATE_FORMAT.WEEKDAY_DAY) : day.format(DATE_FORMAT.DAY)
    
    const eventsListLayout = dayEvents.map((event, index) => (
        <Event key={index}
               title={event.title}
               members={event.members}
               onClick={() => setEventSelected(event)}
        />
    ))
    
    return (
        <div className={stylesCell} onClick={handleSelectDay}>
            <p className={stylesDay}>
                {dayNumber}
            </p>
            <div className={s.events}>
                {eventsListLayout}
            </div>
        </div>
    )
}