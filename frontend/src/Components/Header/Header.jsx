import React from 'react'
import { Link } from 'react-router-dom'

import {ReactComponent as Dogs} from '../../Assets/dogs.svg';

import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link to='/' className={styles.logo}><Dogs /></Link>
        <Link to='/login' className={styles.login}>Login / Cadastre-se</Link>
      </nav>
    </header>
  )
}

export default Header
