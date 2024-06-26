import {dragAndDropable} from "../../src/dragAndDrop";

document.addEventListener('DOMContentLoaded', () => {
    initFileDialog()
})

function initFileDialog() {
    initDialog(document.getElementById('file-button'), document.getElementById('file-dialog'))
    const openFileButton = document.getElementById('file-open')
    openFileButton.addEventListener('click', loadImg)
}

function initDialog(button: HTMLElement, dialog: HTMLElement) {
    button.addEventListener('click', () => dialog.classList.toggle('hide'))
    dialog.addEventListener('focusout', () => dialog.classList.toggle('hide'))
}
//TODO: застевание второй картинки
//TODO: удаление
//TODO: ДНД при переключении удаляет картинку

function loadImg() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.png, .jpg, .jpeg, .bmp'
    input.click()
    input.addEventListener('change', () => {
        const file = input.files[0]
        const img = document.createElement('img')
        img.src = URL.createObjectURL(file)
        document.getElementById('img-container').append(img)
        dragAndDropable(img)
    }, {once: true})
}