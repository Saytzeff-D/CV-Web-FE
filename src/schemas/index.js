import * as yup from 'yup'

export const contactSchema = yup.object().shape({
    name: yup.string().required('Required'),
    email: yup.string().email('Invalid Email Address').required(),
    subject: yup.string().required(),
    message: yup.string().required()
})

export const newsletterSchema = yup.object().shape({
    email: yup.string().email('Invalid Email Address').required('Required')
})

export const createAccountSchema = yup.object().shape({
    firstname: yup.string().required('Required'),
    lastname: yup.string().required('Required'),
    email: yup.string().email('Invalid Email Address').required('Required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Required'),
    isAgent: yup.boolean(),
    professional_type: yup.string().when('isAgent', {
        is: true,
        then: (schema) => schema.required('Required for agents'),
        otherwise: (schema) => schema.notRequired()
    }),
    experience_level: yup.string().when('isAgent', {
        is: true,
        then: (schema) => schema.required('Required for agents'),
        otherwise: (schema) => schema.notRequired()
    }),
    phone_number: yup.string().when('isAgent', {
        is: true,
        then: (schema) => schema.required('Required for agents'),
        otherwise: (schema) => schema.notRequired()
    })
})

export const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid Email Address').required('Required'),
    password: yup.string().required('Required')
})

export const createAdminSchema = yup.object().shape({
    firstname: yup.string().required('Required'),
    lastname: yup.string().required('Required'),
    email: yup.string().email('Invalid Email Address').required('Required'),
    phone_number: yup.string().required('Required'),
    username: yup.string().required('Required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Required'),
    avatar: yup.mixed().required('Required')
})