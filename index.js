let form = document.forms.todo
let container = document.querySelector('.container')
let todos = []
let modal = document.querySelector('.window')
let modalForm = modal.querySelector('form')
let save = document.querySelector('.save')
let close = document.querySelectorAll('[data-close]')
let checkbox = modal.querySelector('.checkbox')
let id

let pattern = /^[a-z ,.'-]+$/i

let inputs = document.querySelectorAll('input')
inputs.forEach(input => {
    input.onkeyup = () => {
        if (pattern.test(input.value)) {
            input.classList.add('success')
        } else {
            input.classList.add('error')
        }
    }
})

form.onsubmit = (e) => {
    e.preventDefault();

    const { target } = e

    let todo = {
        id: Math.random(),
        title: target.firstElementChild.value,
        isDone: false,
        time: new Date().getHours() + ":" + new Date().getMinutes()
    }

    let input = form.querySelector('input')
    let btn = form.querySelector('button')
    if (todo.title) {
        todos.push(todo)
        form.reset()
        reload(todos)
        input.classList.remove('error')
        btn.classList.remove('error_btn')
    } else {
        input.classList.add('error')
        btn.classList.add('error_btn')
    }
}


function reload(arr) {
    container.innerHTML = ""

    for (let item of arr) {
        // a
        let mainDiv = document.createElement('div')
        let topDiv = document.createElement('div')
        let title = document.createElement('h1')
        let removeBtn = document.createElement('button')
        let removeImg = document.createElement('img')
        let timeSpan = document.createElement('span')
        let time = new Date().getHours() + ":" + new Date().getMinutes()

        // b
        mainDiv.classList.add('item')
        topDiv.classList.add('top')
        removeBtn.classList.add('removeButton')
        removeImg.classList.add('remove')
        timeSpan.classList.add('time')
        title.classList.add('title')

        title.innerHTML = item.title
        removeImg.src = 'img/close.png'
        removeImg.alt = 'remove'

        timeSpan.innerHTML = item.time
        // c
        mainDiv.append(topDiv, timeSpan)
        topDiv.append(title, removeBtn)
        container.append(mainDiv)
        removeBtn.append(removeImg)
        // d
        title.onclick = () => {
            item.isDone = !item.isDone
            title.classList.toggle('done', item.isDone)
        }
        removeBtn.onclick = () => {
            todos = todos.filter(todo => {
                if (todo.id !== item.id) {
                    return true;
                } else {
                    return false;
                }
            });

            mainDiv.remove()
        }
        mainDiv.ondblclick = () => {
            id = item.id
            modal.classList.add('show');
            modalForm.querySelector('input').value = item.title
        };
        close.forEach(exit => {
            exit.onclick = () => {
                modal.classList.remove('show');
            }
        });
        checkbox.onclick = () => {
            if (checkbox.checked) {
                item.isDone = true;
                title.classList.add('done');
            } else {
                item.isDone = false
                title.classList.remove('done');
            }
        }
        if (item.isDone === true) {
            title.classList.add('done');
        } else {
            title.classList.remove('done');
        }
        // let timeInp = document.querySelector('.timeInp')
        // if(timeInp.value >= time) {
        //     item.time = time
        // } else {
        //     item.time = timeInp.value
        // }

        // inputs.forEach(input => {
        //     if (input.classList.contains('error')) {
        //         reload(todos)
        //     }
        // })
    }
}

reload(todos)

modalForm.onsubmit = (e) => {
    e.preventDefault();

    const { target } = e
    let finded = todos.find(item => item.id === id)

    let fm = new FormData(target)

    fm.forEach((value, key) => {
        finded[key] = value
    })


    modal.classList.remove('show')
    reload(todos)
}

