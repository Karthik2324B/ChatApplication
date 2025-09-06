import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { MdMenu } from "react-icons/md";
function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="w-full bg-slate-900 text-gray-300">
      <div>
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <Chatuser />
            <div
              className=" flex-1 overflow-y-auto"
              style={{ maxHeight: "calc(92vh - 8vh)" }}
            >
              <Messages />
            </div>
            <Typesend />
          </>
        )}
      </div>
    </div>
  );
}

export default Right;

// const NoChatSelected = () => {


//   const [authUser] = useAuth();
//   console.log(authUser);
//   return (
//     <>
//       <div className="relative">
//         <label
//           htmlFor="my-drawer-2"
//           className="btn btn-ghost drawer-button lg:hidden absolute left-1 p-1"
//         >
//          <MdMenu className='text-4xl text-white p-0'/>
//         </label>
//         <div className="flex h-screen items-center justify-center">
//           <h1 className="text-center">
//             Welcome{" "}
//             <span className="font-semibold text-xl">
//               {authUser?.user?.fullname}
//             </span>
//             <br />
//             No chat selected, please start conversation by selecting anyone to
//             your contacts
//           </h1>
//         </div>
//       </div>
//     </>
//   );
// };

const NoChatSelected = () => {
  const [authUser] = useAuth();
  console.log("Auth user:", authUser);
  return (
    <div className="relative">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-1 p-1"
      >
        <MdMenu className='text-4xl text-white p-0'/>
      </label>
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-center">
          Welcome{" "}
          <span className="font-semibold text-xl">
            {authUser?.user?.fullname || "Guest"}
          </span>
          <br />
          No chat selected, please start conversation by selecting anyone in your contacts
        </h1>
      </div>
    </div>
  );
};
