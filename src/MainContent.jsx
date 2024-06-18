import { useState, useEffect } from 'react'
import TasksView from "./TasksView"
import TaskCard from './TaskCard';

export default function MainContent({ category, listElements, tagElements }) {
    const [tasks, setTasks] = useState(
        JSON.parse(localStorage.getItem('tasks')) || [
            {
                title: "Create your first task",
                list: "Personal",
                tag: "",
                desc: "",
                completion: false,
                valid: true
            }
        ]
    );
    const [taskIndex, setTaskIndex] = useState(0);
    const [tasksAvailable, setTasksAvailable] = useState(true);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
    
    function taskCompletion() {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].completion = !updatedTasks[taskIndex].completion;
        setTasks(updatedTasks);
        const task = tasks[taskIndex];

        const checkTarget = document.querySelectorAll('.check')[taskIndex];
        const check = checkTarget.querySelector(".check-i");
        const taskTitle = document.querySelectorAll(".task-title")[taskIndex];

        const statusTarget = document.querySelector('.completeStatus');
        const cardBody = document.querySelector('.card-body');

        if (task.completion === true) {
            checkTarget.style.borderColor = "#252525";
            check.style.visibility = "visible";
            taskTitle.style.color = "rgb(156, 163, 175)";
            taskTitle.style.textDecoration = "line-through";

            statusTarget.textContent = "Completed";
            cardBody.style.opacity = 0.3;
            cardBody.style.pointerEvents = "none";
            cardBody.style.cursor = "default";
        } else {
            checkTarget.style.borderColor = "rgb(156, 163, 175)";
            check.style.visibility = "hidden";
            taskTitle.style.color = "#fff";
            taskTitle.style.textDecoration = "none";

            statusTarget.textContent = "Mark as complete";
            cardBody.style.opacity = 1;
            cardBody.style.pointerEvents = "auto";
            cardBody.style.cursor = "pointer";
        }
        if (check) {
            check.addEventListener('mouseover', () => {
                check.style.backgroundColor = '#0074E0';
                check.style.color = '#161616';
            });
            check.addEventListener('mouseout', () => {
                check.style.backgroundColor = 'rgb(24, 24, 27)';
                check.style.color = 'rgb(156, 163, 175)';
            });
        }
    }
    function completionFilter(tC) {
        const statusTarget = document.querySelector('.completeStatus');
        const cardBody = document.querySelector('.card-body');

        if (tC === false) {
            statusTarget.textContent = "Mark as complete";
            cardBody.style.opacity = 1;
            cardBody.style.pointerEvents = "auto";
            cardBody.style.cursor = "pointer";
        } else {
            statusTarget.textContent = "Completed";
            cardBody.style.opacity = 0.3;
            cardBody.style.pointerEvents = "none";
            cardBody.style.cursor = "default";
        }
    }

    function resultsDisplay(e) {
        const titles = tasks.map(task => task.title);
        const resultsContainer = document.querySelector('.search-results');
        const query = e.target.value.toLowerCase();
        resultsContainer.innerHTML = '';

        if (query) {
            const tasksResults = titles.filter(title => title.toLowerCase().includes(query));
            tasksResults.forEach(result => {
                const div = document.createElement('div');
                div.className = 'result-item';
                const resultTitle = document.createElement('div');
                resultTitle.textContent = result;
                div.appendChild(resultTitle);
                const resultList = document.createElement('div');
                resultList.textContent = tasks[titles.indexOf(result)].list;
                resultList.className = 'result-list';
                div.appendChild(resultList);
                div.addEventListener('click', () => {
                    e.target.value = "";
                    resultsContainer.innerHTML = "";
                    setTaskIndex(titles.indexOf(result));
                });
                resultsContainer.appendChild(div);
            });
        }
    }

    return (
        <main className="main-content bg-black">
            <div className="mc-header flex justify-between px-3 py-6 mr-3">
                <div className="filter h-10 flex items-center text-xl px-5 rounded-full">
                    <div className="text-white font-semibold">{category}</div>
                </div>
                <div className="search-container">
                    <div className="search h-10 flex items-center text-white rounded-full px-5">
                        <span className="material-symbols-outlined">
                            search
                        </span>
                        <input className="border-none outline-none" onInput={(e) => resultsDisplay(e)} type="text" placeholder="Search for tasks, lists, etc" />
                    </div>
                    <div className='search-results'></div>
                </div>
            </div>
            <div className="mc-body flex px-3 pb-3 mr-3">
                <section className="tasks-list rounded-2xl mr-6">
                    <TasksView category={category} tasks={tasks} setTasks={setTasks} listElements={listElements} tagElements={tagElements} taskIndex={taskIndex} setTaskIndex={setTaskIndex} taskCompletion={taskCompletion} completionFilter={completionFilter} tasksAvailable={tasksAvailable} setTasksAvailable={setTasksAvailable} />
                </section>
                <section className="task-details rounded-2xl p-4">
                    {tasksAvailable && <TaskCard tasks={tasks} setTasks={setTasks} taskIndex={taskIndex} taskCompletion={taskCompletion} listElements={listElements} tagElements={tagElements} />}
                </section>
            </div>
        </main>
    )
}