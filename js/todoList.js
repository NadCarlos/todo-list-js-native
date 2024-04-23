document.addEventListener('DOMContentLoaded', () => {
    let taskInput = document.getElementById('taskInput');
    let addTaskBtn = document.getElementById('addTaskBtn');
    let taskList = document.getElementById('taskList');
    let changeWallpaper = document.getElementById('changeWallpaper');


    let image_array = ['gkill.jpg', 'itr.png', 'messi.webp']

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [
        {
            id: 1,
            name: "Recover Artifact",
            completed: true,
        },
        {
            id: 2,
            name: "Clear Pobeda Factory",
            completed: false,
        }
    ];

    let saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    let renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            let li = document.createElement('li');
            let completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.addEventListener('click', () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            });

            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                tasks = tasks.filter(t => t.id !== task.id);
                saveTasks();
                renderTasks();
            });

            let taskName = document.createElement('p');
            taskName.textContent = task.name
            li.appendChild(taskName)

            let taskState = document.createElement('p');
            if (task.completed === true) {
                taskState.textContent = 'Completed';
                
            }
            else{
                taskState.textContent = 'Incomplete';
            }
            
            li.appendChild(taskState)

            li.appendChild(deleteButton)
            li.appendChild(completeButton);
            taskList.appendChild(li);
        });
    };

    renderTasks();

    addTaskBtn.addEventListener('click', () => {
        let taskText = taskInput.value.trim();
        if (taskText !== '') {
            let newTask = {
                id: tasks.length + 1,
                name: taskText,
                completed: false
            };
            tasks.push(newTask);
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    });
    
    let get_random_image = () => {
        let random_index = Math.floor(Math.random() * image_array.length);
        let selected_image = image_array[random_index]
        document.body.background = `wallpapers/${selected_image}`
        document.getElementById("fondo").style.backgroundImage
    };

    get_random_image()

    changeWallpaper.addEventListener('click', () => {
        get_random_image()
    });
});
