"use client";

import { FC } from 'react';
import Image from 'next/image';
import { useUser } from '../../../../store/user';
import { User } from '../../../../interfaces/user';
import { getItem } from '../../../helpers';

type Props = {
    userProfile?: User;
    showProfileName?: boolean;
}

const AppAvatar: FC<Props> = ({ showProfileName = true }) => {
  const userStore = useUser();
  const user = userStore.loggedInUser ? userStore.loggedInUser : getItem('clientD');


  const getInitials = (user: User) => {
    const names = user.fullName ?  user.fullName.split(' ') : [user.firstName, user.lastName];
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
  }

  return (
    <>
        <div className="flex items-center space-x-2">
            <div>
                {
                    (user && user.profileImage) ? 
                    (
                        <Image
                            src={user.profileImage}
                            alt="User"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full p-2 bg-black flex items-center justify-center">
                            <span className="text-white text-xl font-bold">
                                { user ? getInitials(user as User) : 'JD' }
                            </span>
                        </div>
                    )
                }
            </div>

            {
                (showProfileName) ? (
                    <div>
                        <p className="text-sm font-medium">
                            { user ? `${user?.firstName} ${user?.lastName}` : ""}
                        </p>
                        <p className="text-xs">{user?.email || ""}</p>
                    </div>
                ) : null
            }
        </div>
        
    </>
  )
}

export default AppAvatar;