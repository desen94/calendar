import cn from 'classnames'
import React from 'react'
import {ReactComponent as ResetIcon} from '../../../assets/icons/cross.svg'
import {BUTTON_APPEARANCE} from '../../constants'
import {Button} from '../Button'
import s from './Input.module.scss'

export const Input = React.forwardRef(({
                                           value,
                                           type = 'text',
                                           label,
                                           name,
                                           placeholder,
                                           readonly,
                                           readonlyStyles,
                                           handleReset,
                                           invalid,
                                           error,
                                           isDirty,
                                           isTouched,
                                           ...props
                                       }, ref) => {
     
        const id = name + '-' + Date.now()
        
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
        
        const errorLayout = !!error?.message && <p className={s.error}>{error.message}</p>
        
        const stylesInput = cn(s.input, !!invalid && s.invalid)
        
        return (
            <div className={s.wrapper}>
                {readonly ? <p className={readonlyStyles}>{value}</p> :
                 (
                     <>
                         <label htmlFor={id} className={s.visuallyHidden}>{label}</label>
                         <input
                             value={value}
                             id={id}
                             type={type}
                             className={stylesInput}
                             placeholder={placeholder}
                             onKeyDown={handleEnter}
                             ref={ref}
                             {...props}
                         />
                         {resetButton}
                         {errorLayout}
                     </>
                 )
                }
            </div>
        )
    }
)
