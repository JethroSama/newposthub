import { UserIcon } from '@heroicons/react/solid'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import useUser from '../hooks/useUser'
import AuthorImage from './AuthorImage'
import ConfirmationButton from './ConfirmationButton'
import DotsMenu from './DotsMenu'

const Comment = ({ data, loading, deleteComment }) => {
    // const { text, author, createdAt, updatedAt, _id } = data
    const [user] = useUser()

    console.log(user)

    const text = data?.text
    const author = data?.author
    const isAuthor = author?._id === user?._id

    const handleDelete = (id) => {
        deleteComment(id)
    }

    return (
        <div className='flex space-x-1'>
            <AuthorImage loading={ loading } image={ author?.profilePicture?.url } authorId={ author?._id } />


            <div className='bg-tertiary-dark py-1 px-2 rounded-xl w-full max-w-xl flex-1'>
                <div className='flex justify-between'>

                    <p className='font-bold text-sm'>{ loading ? <Skeleton width={ 60 } /> : author?.username }</p>
                    {
                        loading ? <Skeleton width={ 30 } /> : isAuthor && <DotsMenu className="bg-secondary-dark">
                            <ConfirmationButton handleDelete={ () => handleDelete(data._id) } />
                        </DotsMenu>
                    }
                </div>
                <p className='text-md'>{ loading ? <Skeleton count={ 2 } /> : text }</p>
            </div>
        </div>
    )
}

export default Comment