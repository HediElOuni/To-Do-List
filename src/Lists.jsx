import { useState, useEffect } from 'react';

export default function Lists({ listElements, setListElements }) {
    const [showAddList, setShowAddList] = useState(false);

    useEffect(() => {
        localStorage.setItem('listElements', JSON.stringify(listElements));
    }, [listElements]);
    
    return (
        <div className="lists py-2">
            <div className="lists-header flex justify-between items-center px-6 py-2">
                <h2 className="text-white text-xl font-semibold">
                    My lists
                </h2>
                <span className="material-symbols-outlined add" onClick={() => setShowAddList(true)}>
                    add
                </span>
            </div>
            <ul className="lists-list h-40 overflow-y-auto py-2">
                {listElements.map((list, index) => (
                    <li key={index}>
                        {list}
                    </li>
                ))}
            </ul>
            {showAddList && <Overlay />}
            {showAddList && <AddList setShowAddList={setShowAddList} listElements={listElements} setListElements={setListElements} />}
        </div>
    )
}

function AddList({ setShowAddList, listElements, setListElements }) {
    const [validList, setValidList] = useState("");

    useEffect(() => {
        const btn = document.querySelector('.add-catg-btn');
        if (validList) {
            btn.style.opacity = 1;
            btn.style.pointerEvents = "auto";
        } else {
            btn.style.opacity = 0.5;
            btn.style.pointerEvents = "none";
        }
    }, [validList]);

    const handleAddList = () => {
        const updatedListElements = [...listElements, validList];
        setListElements(updatedListElements);
        localStorage.setItem('listElements', JSON.stringify(updatedListElements));
        setShowAddList(false);
    };

    return (
        <div className="add-catg text-white absolute inset-0 z-20 rounded-xl">
            <div className="close-add-catg">
                <span className="material-symbols-outlined float-right cursor-pointer" onClick={() => setShowAddList(false)}>
                    close
                </span>
            </div>
            <input className='text-3xl font-bold py-7 bg-transparent border-none outline-none' type="text" placeholder="Add a list title here" autoFocus={true}
                onInput={(e) => setValidList(e.target.value)} />
            <div>
                <button className="add-catg-btn w-fit font-semibold float-right rounded-full text-center py-2 px-12 opacity-50 pointer-events-none"
                    onClick={handleAddList}>Continue</button>
            </div>
        </div>
    )
}

function Overlay() {
    return (
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
    );
}