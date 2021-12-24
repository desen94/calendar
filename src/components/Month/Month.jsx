import {Fragment} from 'react'
import {Day} from './components/Day'
import s from './Month.module.scss'

export const Month = ({month}) => {
    
    const days = month.map((row, rowIndex) => (
        <Fragment key={rowIndex}>
            {row.map((day, columnIndex) => (
                <Day key={columnIndex} day={day} rowIndex={rowIndex} columnIndex={columnIndex}/>
            ))}
        </Fragment>
    ))
    
    return (
        <div className={s.month}>
            {days}
        </div>
    )
}
