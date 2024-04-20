import React from 'react';
import InitialsAvatar from 'react-initials-avatar';
import { useSelector } from 'react-redux';

const UserAvatar = () => {
  const username = useSelector((state) => state?.user?.user?.username);

  return (
    <>
      <span className="w-10 h-10 p-3 flex items-center justify-center rounded-full  bg-zinc-800 mx-1 select-none">
        <InitialsAvatar
          name={`${username}`}
          style={{ borderRadius: '50%' }}
        />
      </span>
    </>
  );
};

export default UserAvatar;
