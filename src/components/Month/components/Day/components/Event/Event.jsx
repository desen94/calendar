import s from './Event.module.scss'

export const Event = ({title, members, onClick}) => (
    <div className={s.event} onClick={onClick}>
        <p className={s.title}>
            {title}
        </p>
        <p>
            {members}
        </p>
    </div>
)