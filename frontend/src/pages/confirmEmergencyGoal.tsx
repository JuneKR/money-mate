import React from 'react';
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import Body from '@/components/EmergenyPageFour/emergencyResultForm'
const ConfirmEmergencyGoal = () => {
    return(
        <>
    <main className={styles.main}>
        <Sidebar title="My Sidebar" />
        <Navbar title="My Navbar" />
        <Body title="My Body" />
    </main>
    </>
    );
};
export default ConfirmEmergencyGoal;