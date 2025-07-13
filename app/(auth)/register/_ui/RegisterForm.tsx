'use client'

import { registerUser } from "@/utils/auth-functions";
import { Form, Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import { useId, useState } from "react";
import * as Yup from 'yup';
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export type FormValuesRegister = {
    name: string,
    email: string;
    password: string;
};

const initialValues: FormValuesRegister = {
    name: '',
    email: '',
    password: '',
};

const FeedbackSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too short').max(25, 'Too long').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/, 'Invalid password')
        .min(6, 'Too short')
        .max(15, 'Too long')
        .required('Required'),
});

export default function RegisterForm() {
    const nameField = useId();
    const emailField = useId();
    const passwordField = useId();
    const [formError, setFormError] = useState('');
    const router = useRouter();

    const handleSubmit = async (
        values: FormValuesRegister,
        actions: FormikHelpers<FormValuesRegister>
    ) => {
        setFormError('');

        try {
            await registerUser(values);

            const res = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });
            if (res && res.status === 200) {
                router.push("/books");
                toast.success('Success registration!',
                    { duration: 5000 },
                );
            } else {
                setFormError("Registration succeeded but login failed.");
                toast.error('Something went wrong!',
                    { duration: 5000 },
                )
            }
        } catch (error: any) {
            setFormError(error.message || "Registration error");
        }

        actions.setSubmitting(false);
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-8 bg-[#f9f4ef] shadow-lg rounded-2xl border border-[#d3c1ab]">
            <h2 className="text-3xl font-bold text-[#5c4033] mb-6 text-center tracking-wide">Register</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={FeedbackSchema}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-5">
                        <div>
                            <label htmlFor={nameField} className="block text-sm font-medium text-[#5c4033]">Name</label>
                            <Field
                                type="text"
                                name="name"
                                id={nameField}
                                className="w-full mt-1 px-4 py-2 border border-[#d3c1ab] rounded-md bg-[#fffaf5] text-[#3d2b1f] focus:outline-none focus:ring-2 focus:ring-[#c0a98f]"
                            />
                            <ErrorMessage name="name" component="span" className="text-sm text-red-500" />
                        </div>

                        <div>
                            <label htmlFor={emailField} className="block text-sm font-medium text-[#5c4033]">Email</label>
                            <Field
                                type="email"
                                name="email"
                                id={emailField}
                                className="w-full mt-1 px-4 py-2 border border-[#d3c1ab] rounded-md bg-[#fffaf5] text-[#3d2b1f] focus:outline-none focus:ring-2 focus:ring-[#c0a98f]"
                            />
                            <ErrorMessage name="email" component="span" className="text-sm text-red-500" />
                        </div>

                        <div>
                            <label htmlFor={passwordField} className="block text-sm font-medium text-[#5c4033]">Password</label>
                            <Field
                                type="password"
                                name="password"
                                id={passwordField}
                                className="w-full mt-1 px-4 py-2 border border-[#d3c1ab] rounded-md bg-[#fffaf5] text-[#3d2b1f] focus:outline-none focus:ring-2 focus:ring-[#c0a98f]"
                            />
                            <ErrorMessage name="password" component="span" className="text-sm text-red-500" />
                        </div>

                        {formError && <p className="text-sm text-red-600">{formError}</p>}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-4 bg-[#8b5e3c] text-white py-2 px-4 rounded-md hover:bg-[#7a4e31] transition-colors"
                        >
                            {isSubmitting ? "Registering..." : "Register"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
