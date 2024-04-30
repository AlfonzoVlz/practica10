const formulario = document.getElementById('formId')

formulario.addEventListener('submit', async (e) => {
    e.preventDefault()

    const dataFormulario = new FormData(formulario)

    const options = {method : "POST", body: dataFormulario}
    fetch('http://localhost:3000/usuarios', options)
    .then(res => console.log(res))
    .catch(err => console.log(err))

})