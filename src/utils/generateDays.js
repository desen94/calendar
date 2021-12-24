import dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')

export function getMonth(date = dayjs()) {
    const year = date.year()
    const month = date.month()
    const firstDayOfTheMonth = dayjs(new Date(year, month, 0)).day()
    let currentMonthCount = 0 - firstDayOfTheMonth
    
    return new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++
            return dayjs(new Date(year, month, currentMonthCount))
        })
    })
}