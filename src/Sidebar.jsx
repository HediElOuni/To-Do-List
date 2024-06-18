import { useEffect } from "react"
import Lists from "./Lists"
import Tags from "./Tags"

export default function Sidebar({ setCategory, listElements, setListElements, tagElements, setTagElements }) {
    useEffect(() => {
        const categories = document.querySelectorAll('.all-container, .lists-list li, .tags-list li');
        const handleClick = (event) => {
            const categoryValue = ((event.target.textContent === 'bookAll my tasks') || (event.target.textContent === 'book')) ? 'All my tasks' : event.target.textContent;
            setCategory(categoryValue);
            localStorage.setItem('category', categoryValue);
        };
        categories.forEach(category => {
            category.addEventListener('click', (event) => {
                handleClick(event);
                category.classList.add('active');

                categories.forEach(fCatg => {
                    if (fCatg !== category) {
                        fCatg.classList.remove('active');
                    }
                });
            });
        });

        return () => {
            categories.forEach(category => {
                category.removeEventListener('click', handleClick);
            });
        };
    }, [listElements, tagElements, setCategory]);
    return (
        <nav className="sidebar w-60 pt-3">
            <div className="px-6">
                <h1 className="text-white text-3xl font-bold text-center py-3 border-2 border-white rounded-full">
                    To-Do List
                </h1>
            </div>
            <h3 className="all-container flex text-lg items-center px-6 py-2 my-4">
                <span className="all-i material-symbols-outlined">
                    book
                </span>
                <span className="all">All my tasks</span>
            </h3>
            <Lists listElements={listElements} setListElements={setListElements} />
            <Tags tagElements={tagElements} setTagElements={setTagElements} />
        </nav>
    )
}