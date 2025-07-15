import * as Yup from 'yup';

export const validationBookSchema = Yup.object({
    title: Yup.string().required('Required'),
    author: Yup.string().required('Required'),
    published: Yup.date().nullable(),
    genre: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
});