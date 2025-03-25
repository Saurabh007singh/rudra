import axios from "axios"


export const sendMail=async(to,orderData,totalAmount)=>{
try {
  const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/send-mail`,{to,orderData,totalAmount},
     {headers: { 'Content-Type': 'application/json' }}
  )
  return response
} catch (error) {
  return error
}
}