import { createContext, useState } from "react";

export const DataContext = createContext(null);


const DataProvider = ({ children }) => {

    const [account, setAccount] = useState({ username: '', name: '', id: '', pic: '', followers: '', following: '' });

    return (
        <DataContext.Provider value={{
            account,
            setAccount
        }}>
            {children}
        </DataContext.Provider>
    )

}

export default DataProvider;