// components/TopperCarousel.jsx
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
    ChevronLeft,
    ChevronRight,
    Trophy,
    Award,
    Calendar,
    BookOpen,
    Hash,
    GraduationCap,
    Star
} from 'lucide-react';
import { getApi } from '../../api';
import { useQuery } from '@tanstack/react-query';

const TopperCarousel = () => {


    const { data = [], isLoading, isError } = useQuery({
        queryKey: ['topper'],
        queryFn: async () => {
            const res = await getApi('result/Toppers');
            return res.data;
        }
    })


    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
            slidesToScroll: 1,
        },
        [Autoplay({ delay: 4000, stopOnInteraction: false })]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index) => {
            if (emblaApi) emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);

        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    // Format class name (capitalize first letter)
    const formatClassName = (className) => {
        return className.charAt(0).toUpperCase() + className.slice(1);
    };

    // Calculate percentage
    const getPercentage = (obtained, total) => {
        return ((obtained / parseInt(total)) * 100).toFixed(1);
    };

    // Get grade color based on percentage
    const getGradeColor = (obtained, total) => {
        const percentage = (obtained / parseInt(total)) * 100;
        if (percentage >= 90) return 'from-emerald-500 to-green-600';
        if (percentage >= 80) return 'from-blue-500 to-indigo-600';
        if (percentage >= 70) return 'from-purple-500 to-violet-600';
        return 'from-orange-500 to-amber-600';
    };

    if (!data || data.length === 0) {
        return (
            <div className="w-full py-12 text-center text-gray-500">
                <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No topper data available</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <Star className="w-6 h-6 text-yellow-500 animate-pulse" />
                    <Trophy className="w-10 h-10 text-yellow-500" />
                    <Star className="w-6 h-6 text-yellow-500 animate-pulse" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Class Toppers
                </h2>
                <p className="text-gray-600 mt-2 text-sm md:text-base">
                    🎉 Celebrating our brilliant achievers from the last exam
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-4 rounded-full" />
            </div>

            {/* Carousel Container */}
            <div className="relative group">
                {/* Previous Button */}
                <button
                    onClick={scrollPrev}
                    className="absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-indigo-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                {/* Next Button */}
                <button
                    onClick={scrollNext}
                    className="absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-indigo-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                {/* Embla Viewport */}
                <div className="overflow-hidden px-2" ref={emblaRef}>
                    <div className="flex -ml-4">
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 pl-4 min-w-0"
                            >
                                <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group/card">
                                    {/* Card Inner */}
                                    <div className="bg-white rounded-2xl p-6 h-full relative overflow-hidden">
                                        {/* Background Decoration */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50" />

                                        {/* Rank Badge */}
                                        <div className="absolute top-4 right-4">
                                            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                                                <span className="text-white text-xs font-bold">#1</span>
                                            </div>
                                        </div>

                                        {/* Trophy Icon */}
                                        <div className="flex justify-center mb-4 relative">
                                            <div className={`w-20 h-20 bg-gradient-to-br ${getGradeColor(item.topper.obtainedMarks, item.totalMarks)} rounded-full flex items-center justify-center shadow-lg group-hover/card:scale-110 transition-transform duration-300`}>
                                                <Award className="w-10 h-10 text-white" />
                                            </div>
                                        </div>

                                        {/* Class Badge */}
                                        <div className="text-center mb-3">
                                            <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                                                <GraduationCap className="w-4 h-4" />
                                                Class {formatClassName(item.class)}
                                            </span>
                                        </div>

                                        {/* Topper Name */}
                                        <h3 className="text-xl font-bold text-gray-800 text-center mb-4 truncate px-2">
                                            {item.topper.name}
                                        </h3>

                                        {/* Details Grid */}
                                        <div className="space-y-2.5 mb-5">
                                            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                                    <Hash className="w-4 h-4 text-indigo-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Student ID</p>
                                                    <p className="text-sm font-medium text-gray-700">{item.topper.id}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                                    <BookOpen className="w-4 h-4 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Subject</p>
                                                    <p className="text-sm font-medium text-gray-700">{item.subject}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                                                    <Calendar className="w-4 h-4 text-pink-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Exam Date</p>
                                                    <p className="text-sm font-medium text-gray-700">{item.examDate}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Score Section */}
                                        <div className="relative p-4 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-xl border border-green-100">
                                            <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                                                <span className="px-3 py-0.5 bg-green-500 text-white text-xs font-semibold rounded-full">
                                                    SCORE
                                                </span>
                                            </div>
                                            <div className="text-center pt-2">
                                                <div className="flex items-baseline justify-center gap-1">
                                                    <span className="text-4xl font-bold text-green-600">
                                                        {item.topper.obtainedMarks}
                                                    </span>
                                                    <span className="text-xl text-gray-400">/</span>
                                                    <span className="text-xl text-gray-500">{item.totalMarks}</span>
                                                </div>
                                                <div className="mt-2 flex items-center justify-center gap-2">
                                                    <div className="w-full max-w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
                                                            style={{ width: `${getPercentage(item.topper.obtainedMarks, item.totalMarks)}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-semibold text-green-600">
                                                        {getPercentage(item.topper.obtainedMarks, item.totalMarks)}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-8">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === selectedIndex
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 w-8'
                            : 'bg-gray-300 hover:bg-gray-400 w-2'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default TopperCarousel;