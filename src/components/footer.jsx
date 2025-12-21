import React from "react";
import { Link } from "react-router-dom";

export default () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#16213f] border-t border-slate-200 py-6">
            <div className="container mx-auto px-4 py-8 sm:py-12">
                <div className="flex flex-row pb-5 justify-between gap-2 max-w-5xl mx-auto">
                    <div className="flex-1 flex flex-col sm:items-start ">
                        <Link to="/" className="inline-flex items-center gap-3">
                            <div className="flex items-center mb-4 md:mb-0">
                                <i className="fab fa-slack text-3xl mr-2 text-white"></i>
                                <span className="text-2xl font-bold text-white">JpInnovative</span>
                            </div>
                        </Link>

                        <p className="mt-2 text-sm text-white max-w-xs leading-snug">
                            Where comfort meets your step.
                        </p>

                        <div className="mt-3 flex gap-2">
                            <a
                                href="https://www.facebook.com/profile.php?id=100078562877994"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-slate-100/60 text-slate-700 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                            >
                                <i className="fab fa-facebook-f text-sm"></i>
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a
                                href="https://wa.me/8801891614300"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-slate-100/60 text-slate-700 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                            >
                                <i className="fab fa-whatsapp text-base"></i>
                                <span className="sr-only">WhatsApp</span>
                            </a>
                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-slate-100/60 text-slate-700 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                            >
                                <i className="fab fa-instagram text-base"></i>
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a
                                href="https://www.tiktok.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-slate-100/60 text-slate-700 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                            >
                                <i className="fab fa-tiktok text-sm"></i>
                                <span className="sr-only">Tiktok</span>
                            </a>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-6 sm:gap-8">
                        <nav className="grid grid-cols-2 gap-4 text-sm">
                            <Link to="/" className="text-white hover:text-white transition hover:underline">
                                Home
                            </Link>
                            <Link to="/courses" className="text-white hover:text-white transition hover:underline">
                                Courses
                            </Link>
                            <Link to="/admission" className="text-white hover:text-white transition hover:underline">
                                Admission
                            </Link>
                            <Link to="/contact" className="text-white hover:text-white transition hover:underline">
                                Contact
                            </Link>
                            <Link to="/result" className="text-white hover:text-white transition hover:underline">
                                Result
                            </Link>
                        </nav>
                    </div>
                </div>

                <div className="mt-2 pt-4 border-t border-slate-100 flex flex-col items-center justify-between gap-3">
                    <p className="text-sm text-slate-200">© {year} JpInnovative. All rights reserved.</p>
                </div>
                <div className="mt-2 flex text-center justify-center">
                    <p className="text-sm text-slate-200">Developed By <a href="https://appbyte.net" target="_blank" rel="noopener noreferrer" className="text-rose-500 font-semibold underline">Appbyte</a></p>
                </div>
            </div >
        </footer >
    );
};