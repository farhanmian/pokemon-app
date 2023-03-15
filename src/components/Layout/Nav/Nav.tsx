import React, { useRef, useState } from 'react'
import styles from './Nav.module.css'
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  const searchValue = useRef<HTMLInputElement>(null);

  const searchPekemonHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = searchValue.current?.value;
    if(!value) return;
    console.log('value',value)
    navigate(`/${value}`)
  }

  return (
    <nav>
      <form className={styles.innerContainer} onSubmit={searchPekemonHandler} >
        <input ref={searchValue} placeholder='eg: pikachu' />
        <button>Search</button>
      </form>
    </nav>
  )
}

export default Nav