import { Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import Link from "next/link"
import Nprogress from 'nprogress'
import { toast } from 'react-toastify'
import { poster } from '../lib/fetcher'

const Login = () => {
    const router = useRouter()
    const handleSubmit = async ({ usernameOrEmail, password }, { setSubmitting }) => {
        Nprogress.start()
        setSubmitting(true)
        // const res = await axios.post('/api/auth/login', { usernameOrEmail, password })
        const [err, data] = await poster('/api/auth/login', { usernameOrEmail, password })
        console.log(data)
        if (err) {
            toast.error(err.message)
            Nprogress.done()
            return setSubmitting(false)
        }
        Nprogress.done()
        router.push('/')
        toast.success("Welcome back, " + data.user.username, { delay: 1000 })
        setSubmitting(false)
    }
    return (
        <div
            className='pt-5 lg:pt-0 min-h-screen bg-primary-dark'
        >
            <div className='min-h-screen space-y-10 px-3 flex flex-col lg:flex-row items-center lg:justify-around'>

                <div className='text-offwhite-50 text-center lg:text-left'>
                    <h1 className="text-5xl font-bold font-mono">POSTHUB</h1>
                    <p className='text-lg md:text-xl max-w-md'>Connect with friends and the world around you on Posthub. </p>
                </div>

                <div className='rounded-lg p-2 bg-secondary-dark w-full max-w-md mx-auto md:mx-0'>

                    <Formik initialValues={ { usernameOrEmail: '', password: '' } }
                        onSubmit={ handleSubmit }>
                        { ({ values, handleChange, isSubmitting, handleSubmit }) => (
                            <form className='flex flex-col space-y-3' onSubmit={ handleSubmit }>

                                <input className=' px-4 py-3 rounded-lg outline-none text-md md:text-xl text-offwhite-50 bg-tertiary-dark' placeholder='Username or Email' type="text" name="usernameOrEmail" value={ values.usernameOrEmail } onChange={ handleChange } />
                                <input className=' px-4 py-3 rounded-lg outline-none text-md md:text-xl text-offwhite-50 bg-tertiary-dark' placeholder='Password' type="password" name="password" value={ values.password } onChange={ handleChange } />
                                <button disabled={ isSubmitting } className='px-4 hover:brightness-110 mb-5 py-3 rounded-lg outline-none text-md md:text-xl font-bold text-offwhite-50 bg-primary-dark' type="submit">Log In</button>

                            </form>
                        ) }
                    </Formik>
                    <div className='flex flex-col items-center my-5 space-y-5'>
                        <Link href="#">
                            <a className='text-offwhite-50'>Forgot password?</a>
                        </Link>
                        <hr className='border-b-[1px] border-primary-dark w-full' />

                        <button className='px-4 hover:brightness-110 py-3 rounded-lg outline-none text-md md:text-xl text-offwhite-50 bg-primary-dark max-w-xs' type="submit"><Link href="/signup">Create new account</Link></button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login