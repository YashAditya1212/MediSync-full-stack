import { createContext } from "react";
import { API_BASE_URL } from "../../config/api";


export const AdminAppContext = createContext()

const AdminAppContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY || 'USD'
    const backendUrl = API_BASE_URL
    
    // Warn if backendUrl is not set
    if (!backendUrl) {
        console.warn('⚠️ VITE_BACKEND_URL is not configured.')
        console.warn('📝 Add VITE_BACKEND_URL to your frontend environment before deployment.')
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Function to calculate the age eg. ( 20_01_2000 => 24 )
    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)
        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }

    const value = {
        backendUrl,
        currency,
        slotDateFormat,
        calculateAge,
    }

    return (
        <AdminAppContext.Provider value={value}>
            {props.children}
        </AdminAppContext.Provider>
    )

}

export default AdminAppContextProvider
