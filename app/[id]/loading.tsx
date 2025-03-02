import React from 'react'
import styles from './page.module.css'
import loadingStyles from './loading.module.css'

export default function Loading() {
  return (
    <div className={loadingStyles.animate}>
      <div
        className={loadingStyles.loading}
        style={{width: '200px', marginBottom: '2rem'}}
      ></div>
      <div className={loadingStyles.container}>
        <div
          className={styles.detail__image}
          style={{backgroundColor: '#364153', borderRadius: '8px'}}
        ></div>
        <div className={styles.detail__description}>
          <div className={loadingStyles.loading__title}></div>
          <div className={loadingStyles.loading} style={{width: '100%'}}></div>
          <div className={loadingStyles.loading} style={{width: '90%'}}></div>
          <div className={loadingStyles.loading} style={{width: '95%'}}></div>
          <div className={loadingStyles.loading} style={{width: '65%'}}></div>
          <div
            className={loadingStyles.loading}
            style={{width: '35%', marginTop: '1rem'}}
          ></div>
          <div className={loadingStyles.loading} style={{width: '30%'}}></div>
          <div className={loadingStyles.loading} style={{width: '40%'}}></div>
          <div className={loadingStyles.loading} style={{width: '20%'}}></div>
          <div className={loadingStyles.loading} style={{width: '24%'}}></div>
        </div>
      </div>
    </div>
  )
}
