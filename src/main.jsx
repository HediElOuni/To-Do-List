import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import MainContent from './MainContent'
import './index.css'

function Main() {
  const [category, setCategory] = useState(localStorage.getItem('category') || 'All my tasks');
  const [listElements, setListElements] = useState(JSON.parse(localStorage.getItem('listElements')) || ["Personal", "Work", "Grocery List"])
  const [tagElements, setTagElements] = useState(JSON.parse(localStorage.getItem('tagElements')) || ["Priority"])

  useEffect(() => {
    localStorage.setItem('category', category);
  }, [category]);

  useEffect(() => {
    localStorage.setItem('listElements', JSON.stringify(listElements));
  }, [listElements]);

  useEffect(() => {
    localStorage.setItem('tagElements', JSON.stringify(tagElements));
  }, [tagElements]);

  return (
    <div className='flex h-screen'>
      <Sidebar setCategory={setCategory} listElements={listElements} setListElements={setListElements} tagElements={tagElements} setTagElements={setTagElements} />
      <MainContent category={category} listElements={listElements} tagElements={tagElements} />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)
