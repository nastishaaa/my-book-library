// import { FormValuesLogin } from "@/app/(auth)/login/_ui/LoginForm";
// import { FormValuesRegister } from "@/app/(auth)/register/_ui/RegisterForm";
// import axios from "axios";

// export const loginUser = async (values: FormValuesLogin) => {
//     try {
//         const res = await axios.post('/api/auth/login', values);
    
//         if (res.status === 200) {
//             console.log('✅ User logged in:', res.data);
//         } else {
//             console.warn('⚠️ Unexpected response:', res.status);
//         }
//     } catch (error: any) {
//         console.error('❌ Error during login:', error.response?.data || error.message);
//     }
// };

// export const registerUser = async (values: FormValuesRegister) => {
//     try {
//         const res = await axios.post('/api/auth/register', values);
//         if (res.status === 201) {
//             console.log('✅ User registered:', res.data);
//         } else {
//             console.warn('⚠️ Unexpected response:', res.status);
//         }
//     } catch (error) {
//         console.error('❌ Error during registration:', error);
//     }
// }

// utils/auth-functions.ts

import axios from "axios";
import type { FormValuesRegister } from "@/app/(auth)/register/_ui/RegisterForm";

export const registerUser = async (values: FormValuesRegister) => {
  console.log("Sending to /api/auth/register:", values);
  try {
    const res = await axios.post("/api/auth/register", values, {
      headers: { "Content-Type": "application/json" },
      validateStatus: () => true, 
    });

    if (res.status !== 201) {
      throw new Error(res.data.message || "Failed to register");
    }

    return res.data;
  } catch (err: any) {
    console.error("Axios error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || err.message);
  }
};

