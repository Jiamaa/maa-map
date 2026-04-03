'use client';

import { useState } from "react";

export default function Navbar(){
    const [isOpen, setIsOpen] = useState(false);

    return(
        <nav className="fixed top-0 left-0 right-0 flex bg-white dark:bg-gray-800 shadow-md z-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15">
                <div className="font-bold text-lg text-black dark:text-white h-full flex items-center">
                    Maa Map
                </div>
            </div>
        </nav>
    )
}