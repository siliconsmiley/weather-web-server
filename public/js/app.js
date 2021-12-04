console.log('Client side js is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorMessage = document.querySelector('#error-message')
const resultMessage = document.querySelector('#result-message')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  errorMessage.textContent = ''
  resultMessage.textContent = 'loading...'

  const location = search.value
  console.log(location)

  fetch(
      '/weather?address=' + location).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            console.log('error:', data.error)
            errorMessage.textContent = JSON.stringify(data.error)
            resultMessage.textContent = ''
          } else {
            console.log(data)
            resultMessage.textContent = JSON.stringify(data)
          }
        })
      })
})
