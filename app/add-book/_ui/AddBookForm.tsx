'use client';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useId } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { validationBookSchema } from '@/app/validation/validationBookSchema';

type FormValues = {
    title: string;
    author: string;
    published: string;
    genre: string;
    description: string;
}

const initialValues: FormValues = {
    title: '',
    author: '',
    published: '',
    genre: '',
    description: '',
}

export default function AddBookForm() {
    const titleId = useId();
    const authorId = useId();
    const publishedId = useId();
    const genreId = useId();
    const descriptionId = useId();

    const router = useRouter();

    const handleSubmit = async (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => {
        try {
            await axios.post('/api/book/add', values, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            router.push('/books');
            toast.success('Book added successfully',
                { duration: 5000 }, );
        } catch (error: any) {
            toast.error(`Error adding book: ${error}`,
                { duration: 5000 },
            )
        }
        actions.setSubmitting(false);
    }   

    return (
        <div className="max-w-lg mx-auto mt-12 p-8 bg-[#f9f4ef] shadow-xl rounded-2xl border border-[#d3c1ab]">
            <h2 className="text-3xl font-bold text-[#5c4033] mb-6 text-center tracking-wide">
                Add a New Book
            </h2>

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationBookSchema}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-5">
                        <div>
                            <label htmlFor={titleId} className="text-[#5c4033] font-medium text-sm">
                                Title
                            </label>
                            <Field
                                id={titleId}
                                name="title"
                                type="text"
                                className="w-full px-4 py-2 mt-1 border border-[#d3c1ab] rounded-md bg-[#fffaf5] text-[#3d2b1f] focus:ring-[#c0a98f] focus:outline-none focus:ring-2"
                            />
                            <ErrorMessage name="title" component="div" className="text-sm text-red-500" />
                        </div>

                        <div>
                            <label htmlFor={authorId} className="text-[#5c4033] font-medium text-sm">
                                Author
                            </label>
                            <Field
                                id={authorId}
                                name="author"
                                type="text"
                                className="w-full px-4 py-2 mt-1 border border-[#d3c1ab] rounded-md bg-[#fffaf5] text-[#3d2b1f] focus:ring-[#c0a98f] focus:outline-none focus:ring-2"
                            />
                            <ErrorMessage name="author" component="div" className="text-sm text-red-500" />
                        </div>

                        <div>
                            <label htmlFor={publishedId} className="text-[#5c4033] font-medium text-sm">
                                Published Date
                            </label>
                            <Field
                                id={publishedId}
                                name="published"
                                type="date"
                                className="w-full px-4 py-2 mt-1 border border-[#d3c1ab] rounded-md bg-[#fffaf5] text-[#3d2b1f] focus:ring-[#c0a98f] focus:outline-none focus:ring-2"
                            />
                            <ErrorMessage name="published" component="div" className="text-sm text-red-500" />
                        </div>

                        <div>
                            <label htmlFor={genreId} className="text-[#5c4033] font-medium text-sm">
                                Genre
                            </label>
                            <Field
                                id={genreId}
                                name="genre"
                                type="text"
                                className="w-full px-4 py-2 mt-1 border border-[#d3c1ab] rounded-md bg-[#fffaf5] text-[#3d2b1f] focus:ring-[#c0a98f] focus:outline-none focus:ring-2"
                            />
                            <ErrorMessage name="genre" component="div" className="text-sm text-red-500" />
                        </div>

                        <div>
                            <label htmlFor={descriptionId} className="text-[#5c4033] font-medium text-sm">
                                Description
                            </label>
                            <Field
                                id={descriptionId}
                                name="description"
                                as="textarea"
                                rows={4}
                                className="w-full px-4 py-2 mt-1 border border-[#d3c1ab] rounded-md bg-[#fffaf5] text-[#3d2b1f] focus:ring-[#c0a98f] focus:outline-none focus:ring-2"
                            />
                            <ErrorMessage name="description" component="div" className="text-sm text-red-500" />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-4 bg-[#8b5e3c] text-white py-2 px-4 rounded-md hover:bg-[#7a4e31] transition-colors"
                        >
                            {isSubmitting ? 'Adding...' : 'Add Book'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
