import React from 'react'
import styles from './Input.module.css';

function Input({type, name, label, value, error, onChange, onBlur}) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>{label}</label>
      <input value={value} onChange={onChange} onBlur={onBlur} id={name} type={type} className={styles.input} />
      <p className={styles.error}>{error}</p>
  </div>
  )
}

export default Input
