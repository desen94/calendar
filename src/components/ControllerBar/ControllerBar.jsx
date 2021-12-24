import dayjs from 'dayjs'
import {useContext} from 'react'
import {ReactComponent as ArrowIcon} from '../../assets/icons/arrow.svg'
import {GlobalContext} from '../../context/GlobalContext'
import {Button} from '../../shared/components'
import {DATE_FORMAT} from '../../shared/constants'
import {BUTTON_APPEARANCE} from '../../shared/constants'
import s from './ControllerBar.module.scss'

export const ControllerBar = () => {
    
    const {watchingMonth, setWatchingMonth} = useContext(GlobalContext)
    
    const handleCurrentMonth = () => setWatchingMonth(dayjs())
    
    const handlePrevMonth = () => setWatchingMonth(dayjs(watchingMonth).subtract(1, 'M'))
    
    const handleNextMonth = () => setWatchingMonth(dayjs(watchingMonth).add(1, 'M'))

    const date = dayjs(watchingMonth).format(DATE_FORMAT.MMMM_YYYY)
    
    return (
        <div className={s.bar}>
            <div className={s.controls}>
                <Button className={s.arrow_left} appearance={BUTTON_APPEARANCE.EXTRA_BUTTON}
                        onClick={handlePrevMonth}><ArrowIcon/></Button>
                <p className={s.month}>
                    {date}
                </p>
                <Button appearance={BUTTON_APPEARANCE.EXTRA_BUTTON} onClick={handleNextMonth}><ArrowIcon/></Button>
            </div>
            <Button appearance={BUTTON_APPEARANCE.EXTRA_BUTTON} onClick={handleCurrentMonth}>сегодня</Button>
        </div>
    )
}