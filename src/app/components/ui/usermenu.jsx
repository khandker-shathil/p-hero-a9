"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserMenu = ({ user }) => {
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut();
        router.refresh();
    };

    return (
        <div className="flex items-center gap-2">
            <span className="flex items-center justify-center gap-2"><Image className="rounded-full object-cover" src={user.image} height={50} width={50} alt={user.name} loading="eager" style={{ width: "50px", height: "50px" }}></Image>{user.name}</span>
            <button className="btn btn-ghost hover:btn-error" onClick={handleSignOut}>
                Sign out
            </button>
        </div>
    );
};

export default UserMenu;