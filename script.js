const firstSectionButton = document.getElementById('first-section-button')
const firstSectionInputFile = document.getElementById('first-section-input-file')
const firstSectionAlert = document.getElementById('first-section-alert')
const form = document.getElementById('first-section')
const tree = document.getElementById('tree-viewer')
const treeViewerTitle = document.getElementById('tree-viewer-title')

let fileName = ''
let fileValue = {}


function onClickButton(e) {
    firstSectionInputFile.click()
}

firstSectionButton.addEventListener('click', onClickButton)

async function readFile(file) {
    const text = await file.text()
    return text
}

function convertToObject(value) {
    try {
        return JSON.parse(value)
    } catch (e) {
        return null
    }
}

function toggleAlertMsg(show) {
    show ? firstSectionAlert.classList.add('show') : firstSectionAlert.classList.remove('show')
}

function toggleAriaInvalid(value) {
    toggleAlertMsg(value)
    firstSectionButton.setAttribute('aria-invalid', value ? 'true' : 'false')
    firstSectionInputFile.setAttribute('aria-invalid', value ? 'true' : 'false')
}

function populateTreeViewer(fileValue, fileName) {
    treeViewerTitle.innerHTML = fileName
    console.log({ fileValue })
}

async function onChangeInput(e) {
    const selectedFile = firstSectionInputFile.files[0]
    const jsonValue = await readFile(selectedFile)
    const valueAsObject = convertToObject(jsonValue)
    toggleAriaInvalid(!valueAsObject)

    if(!valueAsObject) {
        return;
    }

    form.remove()
    tree.classList.add('show')

    populateTreeViewer(valueAsObject, selectedFile.name)
}

firstSectionInputFile.addEventListener('change', onChangeInput)
