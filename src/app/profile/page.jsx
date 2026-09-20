import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';
import { EditUserModal } from '../components/ui/edituserinfo';
import { redirect } from 'next/navigation';

const ProfilePage = async() => {
    const session = await auth.api.getSession({headers: await headers()})

    if (!session) {
    redirect("/login");
    }
    const { user } = session;
    console.log(user.id);
    return (
    <div className="max-w-2xl mx-auto py-10 px-4">
        <div className="card card-side bg-base-100 shadow-sm">
        <figure>
            {user.image ? (
                <Image
                    src={user.image}
                    alt={user.name}
                    height={100}
                    width={100}
                    loading='eager'
                />
                ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold">
                    {user.name?.charAt(0).toUpperCase()}
                </div>
                )}
        </figure>
        <div className="card-body">
            <h2 className="card-title">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <div className="space-y-2 text-sm">
                <p><span className="font-medium">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="card-actions justify-end">
            <EditUserModal user={user}></EditUserModal>
            </div>
        </div>
        </div>
    </div>
    );
};

export default ProfilePage;