import React, { useEffect } from 'react'
import fetcherSSR from '../lib/fetcherSSR'
import Login from '../components/Login'
import { toast } from 'react-toastify'

export async function getServerSideProps({ req, res }) {
    const [error, data] = await fetcherSSR(req, res, '/api/auth/user')
    console.log("ssr USER", data)
    console.log("ssr Error", error)

    if (data?.user) {
        return { redirect: { destination: '/' } }
    }
    return { props: { error } }
}

const login = ({ error }) => {
    useEffect(() => {
        if (error) {
            console.log("error", error)
            console.log("error", error.message)
            toast.error(error.message)
        }
    }, [])

    return (
        <Login />
    )
}

export default login