"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const BookingButton = ({ tutorId, isFull }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const handleBookings = async() =>{
        setLoading(true);
        try{
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({ tutorId })
            })
            const data = await res.json()
            if (!res.ok){
                throw new Error(data.message)
            }
            toast.success("Tutor Booked Successfully")
            router.refresh();
        } catch (error){
            toast.error(error.message)
        } finally{
            setLoading(false)
        }}
    return (
        <button onClick={handleBookings} type="button" disabled={isFull || loading} className="mt-6 w-full rounded-md bg-[#1B2A4A] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#243759] disabled:cursor-not-allowed disabled:bg-[#D9D4C8]">
              {isFull ? "Fully booked" : loading ? 'Booking...' : "Book a Session"}
        </button>
    );
};

export default BookingButton;
