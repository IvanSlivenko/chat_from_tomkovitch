import React from 'react'
import { useState } from 'react';
import styles from '../styles/Main.module.css';
import { Link } from 'react-router-dom'

const FIELDS ={
  NAME: "name",
  LASTNAME: "lastname",
  ROOM: "room"

}

const Main = () => {

  const {NAME, LASTNAME, ROOM }  = FIELDS;
  const [values, setValues] = useState( {[NAME]: "", [LASTNAME]: "", [ROOM]: ""} );

  const handleChange =({ target: { name, value,}})=>{
    setValues({...values, [name]: value })
  }

  const handleClick =(e)=>{
    const isDisabled = Object.values(values).some((v) => !v);

    if(isDisabled) e.preventDefault()

  }
  
  return (
   <div className={styles.wrap}>
    <div className={styles.container}>
    <h1 className={styles.heading}>Приєднатись</h1>
    <form
      className={styles.form} 
    >
      <div className={styles.group}>
        <input 
          type="text" 
          name='name' 
          value={values[NAME]}
          placeholder="Ім'я"  
          className={styles.input}  
          onChange={handleChange}
          autoComplete='off'
          required
        />
      </div>

      <div className={styles.group}>
        <input 
          type="text" 
          name='lastname' 
          value={values[LASTNAME]} 
          placeholder="Прізвище "
          className={styles.input}  
          onChange={handleChange}
          autoComplete='off'
          required  
        />
      </div>

      <div className={styles.group}>
        <input 
          type="text" 
          name='room' 
          value={values[ROOM]} 
          placeholder="Назва чату "
          className={styles.input}  
          onChange={handleChange}
          autoComplete='off'
          required  
        />
      </div>

      
      <Link 
  className={styles.group}
  to={`/chat?name=${values[NAME]}&room=${values[ROOM]}&lastname=${values[LASTNAME]}`}
  onClick={handleClick}
>
  <button 
    type='submit'
    className={styles.button}
  >
    Sign In
  </button>
</Link>
    </form>
    </div>
   </div> 
  )
}

export default Main