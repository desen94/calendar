import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import {useContext, useState} from 'react'
import {GlobalContext} from '../../../../context/GlobalContext'
import {ReactComponent as SearchIcon} from '../../../../assets/icons/search.svg'
import {Input} from '../../../../shared/components'
import {DATE_FORMAT} from '../../../../shared/constants'
import s from './Search.module.scss'

dayjs.extend(customParseFormat)

export const Search = ({value = ''}) => {
    const [searchParams, setSearchParams] = useState(value)
    
    const {savedEvents, setWatchingMonth} = useContext(GlobalContext)
    
    const filteredEvents = savedEvents.filter(event => {
            const {date, description, title, members} = event
            
            return title.toLowerCase().includes(searchParams)
                || date.toLowerCase().includes(searchParams)
                || description.toLowerCase().includes(searchParams)
                || members.toLowerCase().includes(searchParams)
        }
    )
    
    const handleClickOnSearchEvent = (event) => {
        setWatchingMonth(dayjs(event.date, DATE_FORMAT.DD_MM_YYYY))
        setSearchParams('')
    }
    
    const handleSearch = (e) => setSearchParams(e.target.value.toLowerCase())
    
    const handleRemove = () => setSearchParams('')
    
    return (
        <div className={s.wrapper}>
            <form className={s.search}>
                <SearchIcon className={s.icon}/>
                <Input type="text"
                       value={searchParams}
                       onChange={handleSearch}
                       placeholder="Найти событие..."
                       handleRemove={handleRemove}
                />
            </form>
            {!!searchParams && (
                <div className={s.resultsWrapper}>
                    <div className={s.results}>
                        {!!searchParams && filteredEvents.map(event => {
                            return (
                                <div
                                    key={event.id}
                                    className={s.event}
                                    onClick={() => handleClickOnSearchEvent(event)}
                                >
                                    <p className={s.title}>{event.title}</p>
                                    <p className={s.date}>{event.date}</p>
                                </div>
                            )
                        })}
                        {!filteredEvents.length && (<p className={s.notFounded}>Ничего не найдено... 🙄</p>)}
                    </div>
                </div>
            )}
        </div>
    )
}