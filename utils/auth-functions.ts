import axios from "axios";
import type { FormValuesRegister } from "@/app/(auth)/register/_ui/RegisterForm";

export const registerUser = async (values: FormValuesRegister) => {
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
    throw new Error(err.response?.data?.message || err.message);
  }
};

