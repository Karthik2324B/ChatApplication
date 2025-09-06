import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessage from '../../context/useGetMessage'
import Loading from '../../components/Loading'
import useGetSocketMessage from "../../context/useGetSocketMessage.js";


const Messages = () => {
    const { loading, messages } = useGetMessage();
    useGetSocketMessage(); // listing incoming messages
    console.log(messages)

    const lastMsgRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            if (lastMsgRef.current) {
                lastMsgRef.current.scrollIntoView({
                    behavior: "smooth",
                });
            }
        }, 100);
    }, [messages]);

    return (
        <div className='h-[80vh] overflow-y-auto scrollbar-hide'>


            {loading ? (<Loading />) : (messages.length > 0 && 
                messages.map((message) => (
                    <div key={message._id} ref={lastMsgRef}>
                        <Message message={message} />
                    </div>
                ))
            )}

            
            
            {
                !loading && messages.length == 0 && (
                    <div>
                        <p className='text-center mt-[20%]'>Say hi to start conversation</p>
                    </div>
                )
            }

        </div>
    )
}

export default Messages
