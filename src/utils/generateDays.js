import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import {CALENDAR_PARAMS} from '../shared/constants/calendarParams'

dayjs.locale('ru')

export function getMonth(date = dayjs()) {
    const year = date.year()
    const month = date.month()
    const firstDayOfTheMonth = dayjs(new Date(year, month, 0)).day()
    let currentMonthCount = 0 - firstDayOfTheMonth
    
    return new Array(CALENDAR_PARAMS.ROWS).fill([]).map(() => {
        return new Array(CALENDAR_PARAMS.COLUMNS).fill(null).map(() => {
            currentMonthCount++
            return dayjs(new Date(year, month, currentMonthCount))
        })
    })
}