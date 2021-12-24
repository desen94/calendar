import {useContext} from 'react'
import {GlobalContext} from '../../context/GlobalContext'
import {Button} from '../../shared/components'
import {BUTTON_APPEARANCE} from '../../shared/constants'
import {QuickEventModal} from './components/QuickEventModal'
import {Search} from './components/Search'
import s from './Header.module.scss'

export const Header = () => {
    const {setShowQuickEventModal, showQuickEventModal} = useContext(GlobalContext)
    
    const handleCreateEvent = (e) => {
        e.preventDefault()
        setShowQuickEventModal(true)
    }
    
    return (
        <header className={s.container}>
            <div className={s.wrapper}>
                <div className={s.controls}>
                    <Button
                        appearance={BUTTON_APPEARANCE.BUTTON}
                        onClick={handleCreateEvent}
                    >
                        Добавить
                    </Button>
                    <Button appearance={BUTTON_APPEARANCE.BUTTON}>Обновить</Button>
                </div>
                <Search/>
                {!!showQuickEventModal && <QuickEventModal/>}
            </div>
        </header>
    )
}