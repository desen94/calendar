import {BUTTON_APPEARANCE} from '../../constants'
import {ReactComponent as ResetIcon} from '../../../assets/icons/cross.svg'
import {Button} from '../Button'
import s from './Input.module.scss'

export const Input = ({className, value, type, placeholder, required, readonly, handleRemove, ...props}) => {
    
    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            event.target.blur()
        }
    }
    
    const resetButton = !!value && !!handleRemove &&
        <Button type="reset"
                appearance={BUTTON_APPEARANCE.RESET}
                onClick={handleRemove}
        >
            <ResetIcon/>
        </Button>
    
    return (
        <div className={s.wrapper}>
            {readonly ? <p className={className}>{value}</p> :
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
