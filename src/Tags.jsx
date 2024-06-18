import { useState, useEffect } from 'react';

export default function Tags({ tagElements, setTagElements }) {
    const [showAddTag, setShowAddTag] = useState(false);

    useEffect(() => {
        localStorage.setItem('tagElements', JSON.stringify(tagElements));
    }, [tagElements]);

    return (
        <div className="tags py-2">
            <div className="tags-header flex justify-between items-center px-6 py-2">
                <h2 className="text-white text-xl font-semibold">
                    Tags
                </h2>
                <span className="material-symbols-outlined add" onClick={() => setShowAddTag(true)}>
                    add
                </span>
            </div>
            <ul className='tags-list h-40 overflow-y-auto py-2'>
                {tagElements.map((tag, index) => (
                    <li key={index}>
                        {tag}
                    </li>
                ))}
            </ul>
            {showAddTag && <Overlay />}
            {showAddTag && <AddTag setShowAddTag={setShowAddTag} tagElements={tagElements} setTagElements={setTagElements} />}
        </div>
    )
}

function AddTag({ setShowAddTag, tagElements, setTagElements }) {
    const [validTag, setValidTag] = useState("");

    useEffect(() => {
        const btn = document.querySelector('.add-catg-btn');
        if (validTag) {
            btn.style.opacity = 1;
            btn.style.pointerEvents = "auto";
        } else {
            btn.style.opacity = 0.5;
            btn.style.pointerEvents = "none";
        }
    }, [validTag]);

    const handleAddTag = () => {
        const updatedTagElements = [...tagElements, validTag];
        setTagElements(updatedTagElements);
        localStorage.setItem('tagElements', JSON.stringify(updatedTagElements));
        setShowAddTag(false);
    };

    return (
        <div className="add-catg text-white absolute inset-0 z-20 rounded-xl">
            <div className="close-add-catg">
                <span className="material-symbols-outlined float-right cursor-pointer" onClick={() => setShowAddTag(false)}>
                    close
                </span>
            </div>
            <input className='text-3xl font-bold py-7 bg-transparent border-none outline-none' type="text" placeholder="Add a tag title here"
                onChange={(e) => setValidTag(e.target.value)} />
            <div>
                <button className="add-catg-btn w-fit font-semibold float-right rounded-full text-center py-2 px-12 opacity-50 pointer-events-none"
                    onClick={handleAddTag}>Continue</button>
            </div>
        </div>
    )
}

function Overlay() {
    return (
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
    );
}