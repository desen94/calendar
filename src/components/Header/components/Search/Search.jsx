import dayjs from 'dayjs'
import {useContext, useState} from 'react'
import {ReactComponent as SearchIcon} from '../../../../assets/icons/search.svg'
import {GlobalContext} from '../../../../context/GlobalContext'
import {Input} from '../../../../shared/components'
import {DATE_FORMAT} from '../../../../shared/constants'
import s from './Search.module.scss'

export const Search = () => {
    const [searchParams, setSearchParams] = useState('')
    
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
    
    const handleReset = () => setSearchParams('')
    
    const filteredEventListLayout = filteredEvents.map(event => {
        const {date, id, title} = event
        return (
            <div
                key={id}
                className={s.event}
                onClick={() => handleClickOnSearchEvent(event)}
            >
                <p className={s.title}>{title}</p>
                <p className={s.date}>{date}</p>
            </div>
        )
    })
    
    const searchResultLayout = !!searchParams && (
        <div className={s.resultsWrapper}>
            <div className={s.results}>
                {!!searchParams && filteredEventListLayout}
                {!filteredEvents.length && (<p className={s.notFounded}>Ничего не найдено... 🙄</p>)}
            </div>
        </div>
    )
    
    return (
        <div className={s.wrapper}>
            <form className={s.search}>
                <SearchIcon className={s.icon}/>
                <Input type="text"
                       value={searchParams}
                       onChange={handleSearch}
                       placeholder="Найти событие..."
                       handleReset={handleReset}
                       onBlur={handleReset}
                />
            </form>
            {searchResultLayout}
        </div>
    )
}
