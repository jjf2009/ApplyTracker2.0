"use client"

import { useState } from "react";
import Link from "next/link";
import { Tag, CaretDown, List } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet";

/**
 * Navbar component redesigned to match the 'eztrackr' design.
 * Uses Tailwind CSS for modern, utility-first styling.
 */
export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { link: "/dashboard", label: "Job tracker" },
        { link: "/dashboard/resume-builder", label: "Resume Builder",},
        { link: "/dashboard/cold-emailer", label: "Cold Email Expert",}
        ,
    ];

    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 px-4">
            <nav className="
                bg-white/90 backdrop-blur-md border border-gray-100 shadow-xl rounded-full px-6 py-2.5 
                flex items-center justify-between transition-all duration-300
            ">
                <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-105 active:scale-95">
                    {/* Purple Icon Container */}
                    <div className="bg-[#6b21a8] p-1.5 rounded-lg">
                        <Tag weight="fill" className="text-white w-5 h-5" />
                    </div>
                    {/* tracking-tight makes font look more professional/modern */}
                    <span className="text-xl font-bold tracking-tight text-gray-900">trackezz</span>
                </Link>

                {/* Desktop Navigation Links (Hidden on mobile) */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.link}
                            className="
                                text-gray-600 hover:text-[#6b21a8] 
                                font-medium text-sm transition-colors 
                                flex items-center gap-1
                            "
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Action Buttons (Right Side) */}
                <div className="hidden md:flex items-center gap-4">
                    <Link 
                        href="/login" 
                        className="text-[#6b21a8] font-semibold hover:opacity-80 transition-opacity text-sm px-4"
                    >
                        Login
                    </Link>
                    <Link 
                        href="/register" 
                        className="
                            bg-[#6b21a8] text-white px-6 py-2.5 rounded-full 
                            font-semibold text-sm shadow-md 
                            hover:bg-[#581c87] hover:shadow-lg 
                            transition-all active:scale-95
                        "
                    >
                        Get started
                    </Link>
                </div>

                {/* Mobile Menu Trigger */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger 
                            render={<Button variant="ghost" size="icon" className="rounded-full" />}
                        >
                            <List size={24} weight="bold" />
                        </SheetTrigger>

                        <SheetContent side="right" className="rounded-l-3xl">
                            <SheetHeader className="pb-8 border-b">
                                <SheetTitle className="text-left flex items-center gap-2">
                                     <div className="bg-[#6b21a8] p-1.5 rounded-lg">
                                        <Tag weight="fill" className="text-white w-4 h-4" />
                                    </div>
                                    eztrackr
                                </SheetTitle>
                            </SheetHeader>

                            <nav className="flex flex-col gap-4 mt-8">
                                {navLinks.map((link) => (
                                    <SheetClose 
                                        key={link.label}
                                        render={
                                            <Link
                                                href={link.link}
                                                className="text-lg font-medium text-gray-700 hover:text-[#6b21a8] px-2 py-1 transition-colors"
                                            />
                                        }
                                    >
                                        {link.label}
                                    </SheetClose>
                                ))}
                                <hr className="my-4 border-gray-100" />
                                <div className="flex flex-col gap-4">
                                    <SheetClose render={<Link href="/login" className="text-[#6b21a8] font-bold text-lg px-2" />}>
                                        Login
                                    </SheetClose>
                                    <SheetClose 
                                        render={
                                            <Link 
                                                href="/sign-up" 
                                                className="bg-[#6b21a8] text-white px-6 py-3 rounded-2xl text-center font-bold shadow-lg"
                                            />
                                        }
                                    >
                                        Get started
                                    </SheetClose>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
}