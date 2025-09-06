import React,{useState} from 'react'
import { MdSend } from 'react-icons/md'
import useSendMessage from '../../context/useSendMessage';

const Typesend = () => {
     const [message, setMessage] = useState("");
    const { loading, sendMessages } = useSendMessage();

    const handleSubmit = async (e) => {
        console.log(e)
        e.preventDefault();
        await sendMessages(message);
        setMessage("");
    };
  return (
    <form  onSubmit={handleSubmit}>
        
        <div className='h-[10vh] bg-gray-800 py-2 px-6 flex space-x-2 shadow-md'>
            <input type="text"
                placeholder="Type here"
                 value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border border-gray-600 rounded-xl w-[90%] px-6 py-2 focus:outline-none " />
            <button>
                <MdSend className='text-4xl cursor-pointer ' />
            </button>
        </div>
     </form>
  )
}

export default Typesend
  

