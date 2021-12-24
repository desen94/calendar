import React from 'react'
import ReactDOM from 'react-dom'
import './styles/globals.scss'
import {App} from './App'
import ContextWrapper from './context/ContextWrapper'

ReactDOM.render(
    <React.StrictMode>
        <ContextWrapper>
            <App/>
        </ContextWrapper>
    </React.StrictMode>,
    document.getElementById('root')
)
