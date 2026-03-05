import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import { doctors as localDoctors } from "../assets/assets";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = import.meta.env.VITE_CURRENCY || '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4002'
    const [doctors, setDoctors] = useState(localDoctors) // Start with local data as fallback

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                console.log("✅ Fetched doctors from backend:", data.doctors.length)
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log("❌ Error fetching doctors from backend:", error.message)
        }
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    const value = {
        doctors,
        getDoctorsData,
        currencySymbol,
        backendUrl
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider