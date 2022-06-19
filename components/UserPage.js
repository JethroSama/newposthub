import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import fetcher, { deleter } from '../lib/fetcher'
import Image from 'next/image'
import PostList from './PostList'
import { toast } from 'react-toastify'
import UpdateProfileModal from './UpdateProfileModal'
import { CameraIcon, PhotographIcon } from '@heroicons/react/outline'

const UserPage = ({ currentUser, uid }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const isOwner = currentUser?._id === user?._id
    const [profileModalOpen, setProfileModalOpen] = useState(false)
    const fetchUser = async () => {
        setLoading(true)
        const [err, user] = await fetcher(`/api/user/${uid}`)
        if (err) {
            return console.error(err)
        }
        setUser(user.user)
        setLoading(false)
    }

    useEffect(() => {
        fetchUser()
    }, [uid])

    const deletePost = async (id) => {
        const toastId = toast.loading("Deleting...")
        const [err] = await deleter(`/api/posts/${id}`)
        if (err) {
            return toast.update(toastId, { render: err.message, type: "error", isLoading: false, closeOnClick: true, autoClose: 2000 })
        }
        setUser(user => ({ ...user, posts: user.posts.filter(post => post._id !== id) })
        )
        return toast.update(toastId, { render: "Post deleted", type: "success", isLoading: false, closeOnClick: true, autoClose: 2000 })

    }

    return (
        <div className='p-3'>
            <UpdateProfileModal isOpen={ profileModalOpen } setIsOpen={ setProfileModalOpen } uid={ uid } />
            <div className='w-full max-w-5xl md:mx-auto bg-secondary-dark rounded-lg text-offwhite-50 flex flex-col items-center py-2 mb-6'>
                <div className='h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40 rounded-full overflow-hidden flex'>
                    { loading ? <Skeleton className='leading-loose' height='160px' width='160px' /> : <div onClick={ () => setProfileModalOpen(true) } className="group cursor-pointer relative text-offwhite-50 w-full h-full flex items-center justify-center bg-tertiary-dark">
                        <div className='opacity-0 group-hover:opacity-100 transition-all ease-in-out absolute top-0 left-0 h-full w-full bg-transparent z-10 flex flex-col justify-center items-center backdrop-blur-lg'><CameraIcon height={ 30 } width={ 30 } /><p className='text-xs sm:text-sm lg:text-lg'>Change photo</p></div>
                        <div className="relative bg-primary-dark h-full w-full rounded-full overflow-hidden group-hover:blur-sm transition-all ease-in-out duration-75">
                            <Image src={ currentUser.profilePicture.url } layout="fill" />
                        </div>
                    </div> }
                </div>

                <h1 className='font-semibold text-lg sm:text-2xl lg:text-3xl'>
                    { loading ? <Skeleton width={ 60 } /> : user.username }
                </h1>
            </div>
            { !loading && user.posts.length === 0 && (<div className='text-center text-offwhite-50 text-lg'>
                { isOwner ? "You haven't posted anything yet" : `${user.username} hasn't posted anything yet` }
            </div>) }
            <PostList posts={ user?.posts } loading={ loading } deletePost={ deletePost } currentUser={ currentUser } />
        </div>
    )
}

export default UserPage