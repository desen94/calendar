import cn from 'classnames'
import {BUTTON_APPEARANCE} from '../../constants'
import s from './Button.module.scss'

export const Button = ({className, children, appearance = BUTTON_APPEARANCE.BUTTON, ...props}) => {
    
    const styles = cn(className, s[appearance])
    
    return (
        <button className={styles} {...props}>
            {children}
        </button>
    )
}