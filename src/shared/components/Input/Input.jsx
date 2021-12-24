import {BUTTON_APPEARANCE} from '../../constants'
import {ReactComponent as ResetIcon} from '../../../assets/icons/cross.svg'
import {Button} from '../Button'
import s from './Input.module.scss'

export const Input = ({classNameReadonly, value, type, placeholder, required, readonly, handleReset, ...props}) => {
    
    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            event.target.blur()
        }
    }
    
    const resetButton = !!value && !!handleReset &&
        <Button type="reset"
                appearance={BUTTON_APPEARANCE.RESET}
                onClick={handleReset}
        >
            <ResetIcon/>
        </Button>
    
    return (
        <div className={s.wrapper}>
            {readonly ? <p className={classNameReadonly}>{value}</p> :
             (
                 <>
                     <input
                         type={type}
                         value={value}
                         className={s.input}
                         placeholder={placeholder}
                         required={required}
                         onKeyDown={handleEnter}
                         {...props}
                     />
                     {resetButton}
                 </>
             )
            }
        </div>
    )
}
