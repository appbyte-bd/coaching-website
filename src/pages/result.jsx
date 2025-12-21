import React, { useState } from 'react';
import { Search, GraduationCap } from 'lucide-react';
import { getApi } from '../api';

const ResultHeader = () => {
    const [studentId, setStudentId] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState([]);
    const [studentInfo, setStudentInfo] = useState(null);
    const [error, setError] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    // Process API response to get student results with rank
    const processResults = (data, searchedStudentId) => {
        const processedResults = [];
        let studentDetails = null;

        data.forEach((exam) => {
            // Sort students by obtained marks (descending) to calculate rank
            const sortedStudents = [...exam.students].sort(
                (a, b) => b.obtainedMarks - a.obtainedMarks
            );

            // Find the current student and their rank
            const studentIndex = sortedStudents.findIndex(
                (s) => s.id === searchedStudentId || s.studentId === searchedStudentId
            );

            if (studentIndex !== -1) {
                const student = sortedStudents[studentIndex];

                // Store student info
                if (!studentDetails) {
                    studentDetails = {
                        name: student.name,
                        id: student.id,
                        studentId: student.studentId
                    };
                }

                processedResults.push({
                    examId: exam._id,
                    date: exam.date,
                    subject: exam.subject,
                    class: exam.class,
                    totalMarks: exam.totalMarks,
                    obtainedMarks: student.obtainedMarks,
                    rank: studentIndex + 1,
                    totalStudents: exam.totalStudents,
                    percentage: ((student.obtainedMarks / parseInt(exam.totalMarks)) * 100).toFixed(1)
                });
            }
        });

        return { processedResults, studentDetails };
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!studentId.trim()) {
            alert('Please enter a Student ID');
            return;
        }

        setIsSearching(true);
        setError('');
        setResults([]);
        setStudentInfo(null);

        try {
            const response = await getApi(`/result/${studentId}`);
            console.log(response.data);

            if (response.data && response.data.length > 0) {
                const { processedResults, studentDetails } = processResults(response.data, studentId);
                setResults(processedResults);
                setStudentInfo(studentDetails);

                if (processedResults.length === 0) {
                    setError('Student not found in any exam results');
                }
            } else {
                setError('No results found for this Student ID');
            }
        } catch (error) {
            console.log(error);
            setError('Failed to fetch results. Please try again.');
        } finally {
            setIsSearching(false);
            setHasSearched(true);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    // Get rank badge with icon
    const getRankBadge = (rank) => {
        if (rank === 1) {
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                    <i className="fas fa-crown"></i> 1st
                </span>
            );
        } else if (rank === 2) {
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-gray-200 text-gray-700">
                    <i className="fas fa-medal"></i> 2nd
                </span>
            );
        } else if (rank === 3) {
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-orange-100 text-orange-700">
                    <i className="fas fa-award"></i> 3rd
                </span>
            );
        } else {
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                    <i className="fas fa-hashtag"></i> {rank}th
                </span>
            );
        }
    };

    // Get percentage color based on score
    const getPercentageColor = (percentage) => {
        const pct = parseFloat(percentage);
        if (pct >= 80) return 'text-green-600';
        if (pct >= 60) return 'text-blue-600';
        if (pct >= 40) return 'text-yellow-600';
        return 'text-red-600';
    };

    // Get progress bar color
    const getProgressBarColor = (percentage) => {
        const pct = parseFloat(percentage);
        if (pct >= 80) return 'bg-green-500';
        if (pct >= 60) return 'bg-blue-500';
        if (pct >= 40) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Title Section */}
                    <div className="py-6">
                        <div className="flex items-center justify-center">
                            <div className="flex items-center space-x-3">
                                <GraduationCap className="h-8 w-8 text-white" />
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                                    Student Results Portal
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Search Section */}
                    <div className="pb-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                                {/* Input Field */}
                                <div className="flex-1">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i className="fas fa-id-card text-gray-400"></i>
                                        </div>
                                        <input
                                            type="text"
                                            value={studentId}
                                            onChange={(e) => setStudentId(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Enter Student ID"
                                            className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg 
                                                bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500
                                                focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent
                                                text-sm sm:text-base transition duration-200"
                                        />
                                    </div>
                                </div>

                                {/* Search Button */}
                                <button
                                    type="submit"
                                    disabled={isSearching}
                                    className="inline-flex items-center justify-center px-6 py-3 
                                        bg-white text-blue-600 font-semibold rounded-lg
                                        hover:bg-gray-100 focus:outline-none focus:ring-2 
                                        focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white
                                        transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                                        shadow-md hover:shadow-lg"
                                >
                                    {isSearching ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
                                            Searching...
                                        </>
                                    ) : (
                                        <>
                                            <Search className="h-5 w-5 mr-2" />
                                            Search Result
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-3">
                            <i className="fas fa-exclamation-circle text-red-500 text-xl"></i>
                            <p className="text-red-700">{error}</p>
                        </div>
                    </div>
                )}

                {/* Student Info Card */}
                {studentInfo && (
                    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                                    <i className="fas fa-user-graduate text-white text-2xl"></i>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">{studentInfo.name}</h2>
                                    <p className="text-gray-500">
                                        <i className="fas fa-id-badge mr-2"></i>
                                        Student ID: {studentInfo.id}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <div className="bg-blue-50 px-4 py-2 rounded-lg">
                                    <p className="text-xs text-blue-600">Total Exams</p>
                                    <p className="text-xl font-bold text-blue-700">{results.length}</p>
                                </div>
                                <div className="bg-green-50 px-4 py-2 rounded-lg">
                                    <p className="text-xs text-green-600">Best Rank</p>
                                    <p className="text-xl font-bold text-green-700">
                                        {results.length > 0 ? Math.min(...results.map(r => r.rank)) : '-'}
                                    </p>
                                </div>
                                <div className="bg-purple-50 px-4 py-2 rounded-lg">
                                    <p className="text-xs text-purple-600">Avg. Score</p>
                                    <p className="text-xl font-bold text-purple-700">
                                        {results.length > 0
                                            ? (results.reduce((sum, r) => sum + parseFloat(r.percentage), 0) / results.length).toFixed(1)
                                            : '-'}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Table */}
                {results.length > 0 && (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        {/* Table Header */}
                        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <i className="fas fa-chart-bar"></i>
                                Exam Results
                            </h3>
                        </div>

                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <i className="fas fa-calendar-alt mr-2 text-blue-500"></i>Date
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <i className="fas fa-book mr-2 text-purple-500"></i>Subject
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <i className="fas fa-clipboard-list mr-2 text-gray-500"></i>Total Marks
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <i className="fas fa-check-circle mr-2 text-green-500"></i>Obtained Marks
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <i className="fas fa-trophy mr-2 text-yellow-500"></i>Rank
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {results.map((result, index) => (
                                        <tr
                                            key={result.examId}
                                            className={`hover:bg-gray-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                                                }`}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <i className="fas fa-calendar text-blue-600"></i>
                                                    </div>
                                                    <span className="font-medium text-gray-800">{result.date}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                                                    <i className="fas fa-book-open"></i>
                                                    {result.subject}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-gray-700 font-semibold text-lg">{result.totalMarks}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-xl font-bold text-gray-800">{result.obtainedMarks}</span>
                                                    <span className={`text-sm font-medium ${getPercentageColor(result.percentage)}`}>
                                                        ({result.percentage}%)
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex flex-col items-center gap-1">
                                                    {getRankBadge(result.rank)}
                                                    <span className="text-gray-400 text-xs">
                                                        of {result.totalStudents} students
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden divide-y divide-gray-100">
                            {results.map((result) => (
                                <div key={result.examId} className="p-4">
                                    {/* Card Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <i className="fas fa-calendar text-blue-600"></i>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{result.date}</p>
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                                                    <i className="fas fa-book-open"></i>
                                                    {result.subject}
                                                </span>
                                            </div>
                                        </div>
                                        {getRankBadge(result.rank)}
                                    </div>

                                    {/* Card Body - Marks Info */}
                                    <div className="grid grid-cols-3 gap-3 bg-gray-50 rounded-lg p-3">
                                        <div className="text-center">
                                            <p className="text-gray-500 text-xs mb-1">
                                                <i className="fas fa-clipboard-list mr-1"></i>Total
                                            </p>
                                            <p className="font-bold text-gray-800 text-lg">{result.totalMarks}</p>
                                        </div>
                                        <div className="text-center border-x border-gray-200">
                                            <p className="text-gray-500 text-xs mb-1">
                                                <i className="fas fa-check-circle mr-1"></i>Obtained
                                            </p>
                                            <p className="font-bold text-gray-800 text-lg">{result.obtainedMarks}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-gray-500 text-xs mb-1">
                                                <i className="fas fa-percentage mr-1"></i>Score
                                            </p>
                                            <p className={`font-bold text-lg ${getPercentageColor(result.percentage)}`}>
                                                {result.percentage}%
                                            </p>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-3">
                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>Performance</span>
                                            <span>{result.percentage}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor(result.percentage)}`}
                                                style={{ width: `${Math.min(parseFloat(result.percentage), 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Rank Info */}
                                    <div className="mt-3 text-center text-xs text-gray-500">
                                        <i className="fas fa-users mr-1"></i>
                                        Ranked {result.rank} out of {result.totalStudents} students
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State - Before Search */}
                {!hasSearched && results.length === 0 && !error && (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <i className="fas fa-search text-blue-500 text-4xl"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Search for Results</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            Enter a student ID in the search box above to view their exam results, marks, and rankings.
                        </p>
                    </div>
                )}

                {/* Empty State - After Search with No Results */}
                {hasSearched && results.length === 0 && !error && (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-yellow-100 flex items-center justify-center">
                            <i className="fas fa-folder-open text-yellow-500 text-4xl"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Results Found</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            We couldn't find any exam results for this student ID. Please check the ID and try again.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultHeader;