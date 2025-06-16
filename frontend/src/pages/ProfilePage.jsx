import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { CalendarDays, Mail, UserCircle } from 'lucide-react';
import dayjs from 'dayjs';

const ProfilePage = () => {
    const { authUser } = useAuthStore();

    return (
        <div className="min-h-[calc(100vh-4rem)] flex justify-center items-center bg-base-200 px-4">
            <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8 text-center">
                <UserCircle className="mx-auto mb-4 text-primary" size={80} />
                <h2 className="text-3xl font-bold mb-1">{authUser.name}</h2>
                <p className="text-sm text-gray-500 mb-6">Welcome back 👋</p>

                <div className="grid gap-4 text-left">
                    <div className="flex items-center gap-3 bg-base-300 p-4 rounded-xl">
                        <Mail className="text-primary" size={24} />
                        <div>
                            <p className="text-sm text-gray-400">Email</p>
                            <p className="text-base font-medium">{authUser.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-base-300 p-4 rounded-xl">
                        <CalendarDays className="text-primary" size={24} />
                        <div>
                            <p className="text-sm text-gray-400">Joined</p>
                            <p className="text-base font-medium">{dayjs(authUser.createdAt).format('MMMM D, YYYY')}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-base-300 p-4 rounded-xl">
                        <CalendarDays className="text-primary" size={24} />
                        <div>
                            <p className="text-sm text-gray-400">Last Updated</p>
                            <p className="text-base font-medium">{dayjs(authUser.updatedAt).format('MMMM D, YYYY')}</p>
                        </div>
                    </div>
                </div>

                <button className="btn btn-primary btn-block mt-8">Hello, {authUser.name}</button>
            </div>
        </div>
    );
};

export default ProfilePage;
