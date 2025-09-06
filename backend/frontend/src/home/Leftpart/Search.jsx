import React,{useState} from 'react';
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zustand/useConversation";
import {toast} from 'react-hot-toast';


const Search = () => {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();
  console.log(allUsers);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };
    return (
        <div className='min-h-[10vh]'>
            <div className='min-h-[10vh]'>
                <div className='py-3 px-6 my-2'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex space-x-4 items-center '>
                            <label className="flex items-center gap-2 px-3 py-2 border border-gray-500 rounded-md w-[90%] bg-slate-900">

                                <input
                                    type="search"
                                    placeholder="Search"
                                    value={search}
                                      onChange={(e) => setSearch(e.target.value)}
                                    required
                                    className="grow bg-transparent focus:outline-none focus:ring-0 w-full"
                                />
                            </label>
                            <button>
                                <FaSearch className='text-3xl text-center hover:cursor-pointer' />
                            </button>

                        </div>

                    </form>
                </div >
            </div>
        </div>

    );
};

export default Search;


