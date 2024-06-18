import { useState, useEffect } from 'react';

export default function TaskCard({ tasks, setTasks, taskIndex, taskCompletion, listElements, tagElements }) {
    const [editList, setEditList] = useState(false);
    const [editTag, setEditTag] = useState(false);

    const task = tasks[taskIndex];

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    function taskTitle(event) {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].title = event.target.value;
        setTasks(updatedTasks);
    }
    function taskDescription(event) {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].desc = event.target.value;
        setTasks(updatedTasks);
    }
    
    return (
        <div className="w-full h-full p-4">
            <div className="card-header flex justify-between items-center text-sm">
                <div>My lists<span className="mx-2">&gt;</span>{task.list}</div>
                <div className="completeStatus cursor-pointer" onClick={() => taskCompletion()}>Mark as complete</div>
            </div>
            <div className={`card-body text-white ${task.completion ? 'opacity-30' : 'opacity-100'}}`}>
                <input className="title text-2xl py-6 font-semibold bg-transparent border-none outline-none" onChange={(event) => taskTitle(event)} value={task.title} />
                <div className="categories flex pb-5">
                    <div className="catg-assigned mr-3" onClick={() => setEditList(true)}>
                        <span className="material-symbols-outlined text-yellow-500">book</span>
                        {task.list}
                    </div>
                    <div className="catg-assigned" onClick={() => setEditTag(true)}>
                        <span className="material-symbols-outlined tag-i">tag</span>
                        {task.tag ? task.tag : "No tag"}
                    </div>
                </div>
                <div className="desc">
                    <div className="desc-title text-xl py-3">Description</div>
                    <textarea className="desc-content w-full h-24 border-none outline-none bg-transparent resize-none" placeholder="Add a more detailed description"
                        onChange={(event) => taskDescription(event)} value={task.desc}></textarea>
                </div>
            </div>
            {(editList || editTag) && <Overlay editList={editList} setEditList={setEditList} editTag={editTag} setEditTag={setEditTag} />}
            {editList && <EditList listElements={listElements} task={task} setEditList={setEditList} setTasks={setTasks} tasks={tasks} />}
            {editTag && <EditTag tagElements={tagElements} task={task} setEditTag={setEditTag} setTasks={setTasks} tasks={tasks} />}
        </div>
    )
}

function EditList({ listElements, task, setEditList, setTasks, tasks }) {
    return (
        <div className="edit-catg">
            <header className="edit-catg-header">Move to...</header>
            <div className="pick-catg">
                <div className="pick-catg-item text-lg font-bold">My lists</div>
                {listElements.map((list, index) => (
                    <div className="pick-catg-item font-normal" key={index}
                        onClick={() => {
                            task.list = list;
                            setTasks([...tasks]);
                            setEditList(false);
                        }}>
                        {list}
                    </div>
                ))}
            </div>
        </div>
    )
}

function EditTag({ tagElements, task, setEditTag, setTasks, tasks }) {
    return (
        <div className="edit-catg">
            <header className="edit-catg-header">Move to...</header>
            <div className="pick-catg">
                <div className="pick-catg-item text-lg font-bold">Tags</div>
                {tagElements.map((tag, index) => (
                    <div className="pick-catg-item font-normal" key={index}
                        onClick={() => {
                            task.tag = tag;
                            setTasks([...tasks]);
                            setEditTag(false);
                        }}>
                        {tag}
                    </div>
                ))}
            </div>
        </div>
    )
}

function Overlay({ editList, setEditList, editTag, setEditTag }) {
    return (
        <div className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={() => {
                if (editList) {
                    setEditList(false);
                }
                if (editTag) {
                    setEditTag(false);
                }
            }}></div>
    );
}