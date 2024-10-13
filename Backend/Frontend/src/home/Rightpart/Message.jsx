import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-[#005c4b]" : "bg-[#1f2c33]";
  const textColor = "text-white";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="py-[2px] px-[6px]">
      <div className={`chat ${chatName}`}>
        <div 
          className={`chat-bubble ${chatColor} ${textColor} rounded-lg px-2 py-[6px] max-w-[85%] sm:max-w-[65%] relative`}
          style={{
            clipPath: itsMe 
              ? 'polygon(0 0, 100% 0, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
              : 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)'
          }}
        >
          <p className="text-[14.2px] leading-[19px]">{message.message}</p>
          <div className="text-[11px] text-[#8696a0] text-right mt-[2px] mr-[2px] flex items-center justify-end">
            {formattedTime}
            {itsMe && (
              <svg viewBox="0 0 18 18" width="18" height="18" className="ml-1">
                <path fill="#53bdeb" d="m17.394 5.035-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"></path>
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;