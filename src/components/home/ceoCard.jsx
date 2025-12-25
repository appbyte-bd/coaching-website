import { ChevronRight, User } from 'lucide-react';

export default function FounderSection() {
    return (
        <section className="py-20 bg-white/10">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
                        Our Visionary Co-Founders
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full"></span>
                    </h3>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Two dedicated leaders united by a shared mission to revolutionize education through innovative technology and inclusive learning.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    {/* First Co-Founder */}
                    <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
                        {/* Founder Image */}
                        <div className="relative">
                            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                                <img
                                    src="/ceo1.jpeg"
                                    alt="M. Afjal Hossain"
                                    className="w-full h-[300px] object-cover transform hover:scale-105 transition-transform duration-500"
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
                                        <h4 className="text-2xl font-bold text-gray-800">M. Afjal Hossain</h4>
                                        <p className="text-indigo-600 font-semibold">B.A (Honours) & M.A, Dhaka University</p>
                                    </div>
                                </div>

                                <div className="space-y-4 text-gray-700 leading-relaxed">
                                    <p>
                                        M. Afjal Hossain is a dynamic educator and strategist with deep roots in academic excellence. Holding advanced degrees from Dhaka University, he brings a strong foundation in research and critical thinking to the table. Passionate about leveraging artificial intelligence to personalize learning experiences, Afjal focuses on bridging the gap between traditional education and modern digital tools, ensuring every student has access to high-quality, adaptive resources.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Second Co-Founder */}
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Founder Image */}
                        <div className="relative">
                            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                                <img
                                    src="/ceo2.jpeg"
                                    alt="M. Ismail Hossen"
                                    className="w-full h-[300px] object-cover transform hover:scale-105 transition-transform duration-500"
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
                                        <h4 className="text-2xl font-bold text-gray-800">M. Ismail Hossen</h4>
                                        <p className="text-indigo-600 font-semibold">
                                            B.A (Honours), Islamic University<br />
                                            Fazil, Tamirul Millat Kamil Madrasah, Tongi
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4 text-gray-700 leading-relaxed">
                                    <p>
                                        M. Ismail Hossen combines a rich background in Islamic studies and humanities with a forward-thinking approach to educational technology. His diverse academic journey has instilled a profound commitment to inclusive and values-based learning. Ismail drives the integration of ethical AI practices and culturally sensitive content into the platform, empowering students from all backgrounds to thrive in a technology-driven world while preserving core educational principles.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}