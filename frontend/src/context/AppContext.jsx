import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = import.meta.env.VITE_CURRENCY || '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

    const [doctors, setDoctors] = useState([])

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                console.error('Failed to fetch doctors:', data.message)
            }
        } catch (error) {
            console.error('Error fetching doctors:', error)
        }
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    const value = {
        doctors,
        currencySymbol,
        backendUrl,
        getDoctorsData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider