import { useState, useEffect } from 'react';

function TasksView({ category, tasks, setTasks, listElements, tagElements, taskIndex, setTaskIndex, taskCompletion, completionFilter, tasksAvailable, setTasksAvailable }) {
    const [showCustom, setShowCustom] = useState(false);
    const [showCustomList, setShowCustomList] = useState(false);
    const [showCustomTag, setShowCustomTag] = useState(false);

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
    
    const taskCreation = () => {
        const shouldCreateTask = tasks.length === 0 || tasks[tasks.length - 1].valid
        if (shouldCreateTask) {
            const newTask = {
                title: "",
                list: "Personal",
                tag: "",
                desc: "",
                completion: false,
                valid: false
            };
            setTasks([...tasks, newTask]);
        }
    };

    const taskListAssign = (list) => {
        const updatedTasks = [...tasks];
        updatedTasks[updatedTasks.length - 1].list = list;
        setTasks(updatedTasks);
    };

    const taskTagAssign = (tag) => {
        const updatedTasks = [...tasks];
        updatedTasks[updatedTasks.length - 1].tag = tag;
        setTasks(updatedTasks);
    };

    const taskAddition = (title) => {
        const updatedTasks = [...tasks];
        updatedTasks[updatedTasks.length - 1].title = title;
        updatedTasks[updatedTasks.length - 1].valid = true;
        setTasks(updatedTasks);
    };

    const taskDeletion = (task) => {
        const updatedTasks = tasks.filter(t => t !== task);
        setTasks(updatedTasks);
    };

    return (
        <div className="w-full h-full flex flex-col justify-between">
            <div className="tasks-display p-2">
                {
                    tasks.map(task => (
                        (task.list === category || task.tag === category || category === "All my tasks") && task.valid === true
                        && (
                            <div className='flex items-center'>
                                <div className="task h-10 flex justify-between items-center px-2 rounded-lg cursor-pointer" key={task.title}
                                    onMouseDown={() => {
                                        if (!tasksAvailable) setTasksAvailable(true);
                                        setTaskIndex(tasks.indexOf(task));
                                        completionFilter(task.completion);
                                    }}>
                                    <div className="flex items-center">
                                        <CheckItem taskCompletion={taskCompletion} />
                                        <div className="task-title text-white">
                                            {task.title}
                                        </div>
                                    </div>
                                </div>
                                <DeleteItem task={task} tasks={tasks} taskIndex={taskIndex} setTaskIndex={setTaskIndex} taskDeletion={taskDeletion} setTasksAvailable={setTasksAvailable} completionFilter={completionFilter} />
                            </div>
                            )
                    ))
                }
            </div>
            <div className="add-task h-16 bg-zinc-800 p-2 shadow relative">
                <div className="add-field flex items-center bg-zinc-600 p-2 border border-white rounded-md mr-2">
                    <span className="material-symbols-outlined">add</span>
                    <input className='bg-zinc-600 border-none outline-none' type="text" placeholder="Add new task"
                        onFocus={() => {
                            setShowCustom(true);
                            taskCreation();
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                taskAddition(e.target.value);
                                e.target.value = "";
                                taskCreation();
                                setShowCustom(false);
                                setShowCustomList(false);
                                setShowCustomTag(false);
                            }
                        }}
                    />
                </div>
                {showCustom && <TaskCustom showCustomList={showCustomList} setShowCustomList={setShowCustomList} showCustomTag={showCustomTag} setShowCustomTag={setShowCustomTag} />}
                {showCustomList && <TaskCustomList setShowCustomList={setShowCustomList} taskListAssign={taskListAssign} tasks={tasks} listElements={listElements} />}
                {showCustomTag && <TaskCustomTag setShowCustomTag={setShowCustomTag} taskTagAssign={taskTagAssign} tasks={tasks} tagElements={tagElements} />}
            </div>
        </div>
    );
}

function CheckItem({ taskCompletion }) {
    return (
        <div className="check border border-white rounded-full mr-2 cursor-pointer" onClick={() => taskCompletion()}>
            <span className="check-i material-symbols-outlined invisible bg-zinc-900 rounded-full">
                check
            </span>
        </div>
    );
}

function DeleteItem({ task, tasks, taskIndex, setTaskIndex, taskDeletion, setTasksAvailable, completionFilter }) {
    const handleDelete = () => {
        taskDeletion(task);
        if (tasks.length === 1 || (tasks.length === 2 && tasks[tasks.length - 1].valid === false)) {
            setTasksAvailable(false);
        }
        if (taskIndex > 0 && taskIndex === tasks.indexOf(task)) {
            setTaskIndex(taskIndex - 1);
        }
        if (taskIndex > 0) {
            if (tasks[tasks.indexOf(task)].completion === true && tasks[tasks.indexOf(task) - 1].completion === false) {
                completionFilter(false);
            }
            if (tasks[tasks.indexOf(task)].completion === false && tasks[tasks.indexOf(task) + 1].completion === true) {
                completionFilter(true);
            }
        } else {
            if (tasks[tasks.indexOf(task)].completion === true && tasks[tasks.indexOf(task) + 1].completion === false) {
                completionFilter(false);
            }
            if (tasks[tasks.indexOf(task)].completion === false && tasks[tasks.indexOf(task) + 1].completion === true) {
                completionFilter(true);
            }
        }
    };
    return (
        <div className="delete h-6 rounded-full bg-gray-400 cursor-pointer" onClick={handleDelete}>
            <span className="material-symbols-outlined delete-i">
                close
            </span>
        </div>
    );
}

function TaskCustom({ showCustomList, setShowCustomList, showCustomTag, setShowCustomTag }) {
    return (
        <div className="task-custom w-full h-10 flex justify-center items-center bg-zinc-800 pt-2 absolute">
            <span className="material-symbols-outlined px-10 cursor-pointer" tabIndex={0} onClick={
                (event) => {
                    event.target.style.color = "#0074E0";
                    setShowCustomList(!showCustomList);
                    if (showCustomTag) setShowCustomTag(false);
                }
            }
                onBlur={(event) => {
                    event.target.style.color = "rgb(156, 163, 175)";
                }}>book</span>
            <span className="w-px h-5 bg-gray-400"></span>
            <span className="material-symbols-outlined px-10 cursor-pointer" tabIndex={0} onClick={
                (event) => {
                    event.target.style.color = "#0074E0";
                    setShowCustomTag(!showCustomTag);
                    if (showCustomList) setShowCustomList(false);
                }
            }
                onBlur={(event) => {
                    event.target.style.color = "rgb(156, 163, 175)";
                }}>tag</span>
        </div>
    );
}

function TaskCustomList({ setShowCustomList, taskListAssign, tasks, listElements }) {
    return (
        <ul className="custom-catg w-full h-fit absolute py-2 bg-zinc-800 cursor-pointer">
            {listElements.map((list) => {
                const listValue = list;
                let count = 0;
                for (let task of tasks) {
                    if (task.list === listValue) {
                        count++;
                    }
                }
                if (count === 0) count = "No";
                return (
                    (
                        <li className="cc-item py-2" key={list} onClick={() => {
                            setShowCustomList(false);
                            taskListAssign(list);
                        }}>
                            <div className="cc-title">{list}</div>
                            <div className="cc-tasks">{count} tasks</div>
                        </li>
                    )
                )
            })}
        </ul>
    );
}

function TaskCustomTag({ setShowCustomTag, taskTagAssign, tasks, tagElements }) {
    return (
        <ul className="custom-catg w-full h-fit absolute py-2 bg-zinc-800 cursor-pointer">
            {tagElements.map((tag) => {
                const tagValue = tag;
                let count = 0;
                for (let task of tasks) {
                    if (task.tag === tagValue) {
                        count++;
                    }
                }
                if (count === 0) count = "No";
                return (
                    <li className="cc-item py-2" key={tag} onClick={() => {
                        taskTagAssign(tag);
                        setShowCustomTag(false);
                    }}>
                        <div className="cc-title">{tag}</div>
                        <div className="cc-tasks">{count} tasks</div>
                    </li>
                )
            })}
        </ul>
    );
}

export default TasksView;