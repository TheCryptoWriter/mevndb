/* eslint-env browser */
// main.js
const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
    fetch('/advisors', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'David',
                email: 'davidmcneal28@gmail.com'
            })

        })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            window.location.reload(true)
        })
})

deleteButton.addEventListener('click', _ => {
    fetch('/advisors', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: ''
            })
        })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            if (response === 'No advisor to delete') {
                messageDiv.textContent = 'No advisor to delete'
            } else {
                window.location.reload(true)
            }
        })
        .catch(console.error)
})