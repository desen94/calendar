export const CalcModalPosition = (e, rowIndex, columnIndex) => {
    const DECORATOR_WIDTH = 12
    const MODAL_WIDTH = 300
    const MODAL_HEIGHT = 327
    const MODAL_TOTAL_WIDTH = MODAL_WIDTH + DECORATOR_WIDTH
    
    // TODO: MODAL_PARAMS в шаред и инлайн стили применить в компоненте...
    
    let offsets = {}
    
    const getOffsets = (element) => {
        if (element.className.includes('cell')) {
            offsets = {
                offsetTop: element.offsetTop,
                offsetLeft: element.offsetLeft,
                offsetWidth: element.offsetWidth,
                offsetHeight: element.offsetHeight,
            }
        } else {
            getOffsets(element.parentNode)
        }
    }
    
    getOffsets(e.target)
    
    const modalPosition = {
        modal: {},
        decoratorVertical: '',
        decoratorHorizontal: ''
    }
    
    const decoratorTopLeft = {
        top: offsets.offsetTop + 'px',
        left: offsets.offsetLeft + offsets.offsetWidth + DECORATOR_WIDTH + 'px'
    }
    const decoratorBottomLeft = {
        top: offsets.offsetTop + offsets.offsetHeight - MODAL_HEIGHT + 'px',
        left: offsets.offsetLeft + offsets.offsetWidth + DECORATOR_WIDTH + 'px'
    }
    const decoratorTopRight = {top: offsets.offsetTop + 'px', left: offsets.offsetLeft - MODAL_TOTAL_WIDTH + 'px'}
    const decoratorBottomRight = {
        top: offsets.offsetTop + offsets.offsetHeight - MODAL_HEIGHT + 'px',
        left: offsets.offsetLeft - MODAL_TOTAL_WIDTH + 'px'
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