export const CalcModalPosition = (e, rowIndex, columnIndex) => {
    const DECORATOR_WIDTH = 12
    const MODAL_WIDTH = 300
    const MODAL_HEIGHT = 327
    const MODAL_TOTAL_WIDTH = MODAL_WIDTH + DECORATOR_WIDTH
    
    // TODO: MODAL_PARAMS в шаред и инлайн стили применить в компоненте
    // TODO: добавить случай клика по ивенту и брать оффсеты у родителя
    
    const modalPosition = {
        modal: {},
        decoratorVertical: '',
        decoratorHorizontal: ''
    }
    
    const decoratorTopLeft = {
        top: e.target.offsetTop + 'px',
        left: e.target.offsetLeft + e.target.offsetWidth + DECORATOR_WIDTH + 'px'
    }
    const decoratorBottomLeft = {
        top: e.target.offsetTop + e.target.offsetHeight - MODAL_HEIGHT + 'px',
        left: e.target.offsetLeft + e.target.offsetWidth + DECORATOR_WIDTH + 'px'
    }
    const decoratorTopRight = {top: e.target.offsetTop + 'px', left: e.target.offsetLeft - MODAL_TOTAL_WIDTH + 'px'}
    const decoratorBottomRight = {
        top: e.target.offsetTop + e.target.offsetHeight - MODAL_HEIGHT + 'px',
        left: e.target.offsetLeft - MODAL_TOTAL_WIDTH + 'px'
    }
    
    if (columnIndex <= 3 && rowIndex <= 2) {
        modalPosition.modal = decoratorTopLeft
        modalPosition.decoratorVertical = 'top'
        modalPosition.decoratorHorizontal = 'left'
    }
    if (columnIndex <= 3 && rowIndex > 2) {
        modalPosition.modal = decoratorBottomLeft
        modalPosition.decoratorVertical = 'bottom'
        modalPosition.decoratorHorizontal = 'left'
    }
    
    if (columnIndex > 3 && rowIndex <= 2) {
        modalPosition.modal = decoratorTopRight
        modalPosition.decoratorVertical = 'top'
        modalPosition.decoratorHorizontal = 'right'
    }
    if (columnIndex > 3 && rowIndex > 2) {
        modalPosition.modal = decoratorBottomRight
        modalPosition.decoratorVertical = 'bottom'
        modalPosition.decoratorHorizontal = 'right'
    }
    
    return modalPosition
}