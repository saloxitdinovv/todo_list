let form = document.forms.todo
let container = document.querySelector('.container')
let todos = []

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
    console.log(todo);
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
            reload(todos);
        }
        title.classList.toggle('done', item.isDone)
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
    }
}

reload(todos)