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

export const updateProfileSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    username: yup.string().required("Username is required"),
    phone: yup.string().required("Phone number is required"),
    currentPassword: yup.string().when("newPassword", {
    is: (val) => val && val.length > 0,
    then: () => yup.string().required("Current password is required to set a new one"),
    otherwise: () => yup.string().notRequired(),
    }),
    newPassword: yup.string().transform((value) => (value === "" ? null : value)).nullable()
    .min(8, "Password must be at least 8 characters long")
    .matches(/(?=.*[0-9])/, "Password must contain at least 1 number"),
    confirmPassword: yup.string().when("newPassword", {
    is: (val) => val && val.length > 0,
    then: () => yup.string()
        .oneOf([yup.ref("newPassword")], "Passwords must match")
        .required("Please confirm your new password"),
    otherwise: () => yup.string().notRequired(),
    }),
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

export const addPropertySchema = yup.object().shape({
    name: yup.string().required('Required'),
    address: yup.string().required('Required'),
    category: yup.string().required('Required'),
    total_price: yup.number().required('Required'),
    type: yup.string().required('Required'),
    inspection_fee: yup.number().required('Required'),
    about: yup.string().required('Required'),
    land_size: yup.string().when('type', {
        is: 'land',
        then: (schema) => schema.required('Required for Land'),
        otherwise: (schema) => schema.notRequired()
    })
})
export const addBlogSchema = yup.object().shape({
    title: yup.string().required('Required'),
    subtitle: yup.string().required('Required'),
    content: yup.string().required('Required')
})

export const resetPasswordSchema = yup.object().shape({
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Required')
})