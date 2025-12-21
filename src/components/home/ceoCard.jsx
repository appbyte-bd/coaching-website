
import { ChevronRight, User } from 'lucide-react';

export default function FounderSection() {
    return (
        <section className="py-20 bg-white/10">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
                        Our Visionary Founder
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full"></span>
                    </h3>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        A visionary leader dedicated to transforming education through technology.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Founder Image */}
                        <div className="relative">
                            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                                <img
                                    src="https://confidencegroup.com.bd/assets/images/chairman/chairman.png"
                                    alt="Mohammad Jewel"
                                    className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                            {/* Decorative Elements */}
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-200 rounded-full opacity-60"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-200 rounded-full opacity-40"></div>
                        </div>

                        {/* Founder Info */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <div className="flex items-center mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                                        <User className="text-white text-2xl w-8 h-8" />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-gray-800">Mohammad Jewel</h4>
                                        <p className="text-indigo-600 font-semibold">Founder & CEO</p>
                                    </div>
                                </div>

                                <div className="space-y-4 text-gray-700 leading-relaxed">
                                    <p>
                                        A visionary leader dedicated to transforming education through technology. With a passion for AI and innovative teaching methodologies, Jewel is reshaping how students learn and succeed in the digital age.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
                                    <a
                                        href="https://appbyte.net/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative px-8 py-4 bg-indigo-600 text-white font-medium rounded-full text-lg transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30"
                                    >
                                        <span className="flex items-center justify-center">
                                            More About
                                            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}