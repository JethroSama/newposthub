import React from 'react'
import { DotsHorizontalIcon, UserIcon } from '@heroicons/react/solid'
import { ChatAltIcon } from '@heroicons/react/outline'
import moment from 'moment'
import Link from "next/link"

const Post = ({ data, user }) => {
    const { text, author, comments, updatedAt } = data
    const commentsCount = comments.length
    const isAuthor = author._id === user.id
    const timePassed = moment(updatedAt).fromNow()
    console.log(data)
    return (
        <div className='w-full bg-secondary-dark rounded-lg text-offwhite-50'>
            {/* Author */ }
            <div className='flex p-2 md:p-4 justify-between'>
                <div className='flex space-x-2'>
                    <div className="text-offwhite-50 hover:brightness-150 bg-tertiary-dark p-2 rounded-3xl cursor-pointer flex justify-center items-center">
                        <UserIcon className="w-7 h-7" />
                    </div>
                    <div>

                        <p className='font-semibold'>{ author.username }</p>
                        <p className='text-sm text-offwhite-100'>{ timePassed }</p>
                    </div>
                </div>

                {
                    isAuthor && (<div className="text-offwhite-100 h-5 flex items-center px-1 cursor-pointer hover:bg-tertiary-dark  rounded-lg">
                        <DotsHorizontalIcon className="w-6 h-6 relative" />
                    </div>)
                }
            </div>

            {/* Content */ }
            <div className='p-2 md:p-4'>
                <p>{ text }</p>
            </div>

            {/* Comments button */ }
            <div className='p-2 md:p-4 space-y-3 flex flex-col'>
                <div className='flex justify-end items-center'>
                    { commentsCount > 0 && (<p className='text-sm text-offwhite-100'>{ commentsCount } { commentsCount > 1 ? "Comments" : "Comment" }</p>) }
                </div>

                <div className='w-full  h-[1px] bg-offwhite-50' />

                <div className='flex justify-center items-center'>
                    <div className="text-offwhite-100 cursor-pointer flex justify-center space-x-1 hover:bg-tertiary-dark px-3 py-1 rounded-lg w-40">
                        <ChatAltIcon className="w-7 h-7" />
                        <p className='font-semibold'>Comment</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Post