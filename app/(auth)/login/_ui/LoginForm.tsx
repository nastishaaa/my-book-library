'use client'

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useId, useState } from "react";
import * as Yup from 'yup';
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export type FormValuesLogin = {
    email: string;
    password: string;
};

const initialValues: FormValuesLogin = {
    email: '',
    password: '',
};

const FeedbackSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Too short')
        .max(15, 'Too long')
        .required('Required'),
});

export default function LoginForm() {
    const emailField = useId();
    const passwordField = useId();
    const [formError, setFormError] = useState('');
    const router = useRouter();

    const handleSubmit = async (
        values: FormValuesLogin,
        actions: FormikHelpers<FormValuesLogin>
    ) => {
        setFormError('');
    
        const res = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        });
    
        if (res?.error) {
            toast.error('Wrong password or email!',
                { duration: 5000 },
            );
        } else if (res?.ok) {
            const session = await getSession();
            if (session) {
                router.push("/favourite-books");
                toast.success('Success login!', 
                    { duration: 5000 },
                );
            } else {
                setFormError("Session not established. Try again.");
            }
        }
    
        actions.setSubmitting(false);
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-8 bg-[#f9f4ef] shadow-lg rounded-2xl border border-[#d3c1ab]">
            <h2 className="text-3xl font-bold text-[#5c4033] mb-6 text-center tracking-wide">LogIn</h2>

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={FeedbackSchema}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-5">
                        <div>
                            <label htmlFor={emailField} className="block text-sm font-medium text-[#5c4033]">Email</label>
                            <Field
                                type="email"
                                name="email"
                                id={emailField}
                                autoComplete="off"
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
                                autoComplete="off"
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
                            {isSubmitting ? 'Logging in...' : 'LogIn'}
                        </button>
                    </Form>
                )}
            </Formik>

            <div className="mt-4 text-center text-sm text-[#5c4033]">
                Don’t have an account? <Link href="/register" className="underline hover:text-[#8b5e3c]">Register now</Link>
            </div>
        </div>
    );
}
