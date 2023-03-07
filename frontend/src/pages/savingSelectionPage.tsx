import React from 'react';
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import Body from '@/components/savingSelectionPageButtons'

const SavingSelectionPage = () => {
    return(
        <>
    <main className={styles.main}>
        
        <div style={{ width: "100%", height: "100%",padding: "0 4rem"}} >
            <Sidebar title="My Sidebar" />
            <div style={{display: "flex", alignItems: "center"}} className="bg-blue-200 h-24 rounded bg-gray-50 dark:bg-gray-800">
               <p style={{ padding: "0 1rem"  }}className="text-2xl text-black dark:text-gray-500">
                  เลือกเป้าหมายการออม
               </p>
            </div>
            <div style={{ width: "100%" , height: "100%" }} className="py-4 flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
               <Body title=''/>
            </div>
        
        </div>
    </main>
    </>
    );
};
export default SavingSelectionPage;