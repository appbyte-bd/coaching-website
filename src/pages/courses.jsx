import { useNavigate } from 'react-router-dom';

const courses = [
    {
        img: "/courses/6.png",
        title: "৬ম শ্রেণি একাডেমিক প্রোগ্রাম ২০২৬",
        items: [
            "সপ্তাহে ৬ দিন লেকচার ক্লাস",
            "ডেইলি MCQ এক্সাম",
            "প্রতি সপ্তাহে অধ্যায়ভিত্তিক এক্সাম",
            "স্পেশাল ইভ্যালুয়েশন মডেল টেস্ট",
            "অধ্যায়ভিত্তিক প্যারালাল টেক্সট ফ্রি!",
            "অভিজ্ঞ ও দক্ষ শিক্ষক দ্বারা পাঠদান"
        ]
    },
    {
        img: "/courses/7.png",
        title: "৭ম শ্রেণি একাডেমিক প্রোগ্রাম ২০২৬",
        items: [
            "সপ্তাহে ৬ দিন লেকচার ক্লাস",
            "ডেইলি MCQ এক্সাম",
            "প্রতি সপ্তাহে অধ্যায়ভিত্তিক এক্সাম",
            "স্পেশাল ইভ্যালুয়েশন মডেল টেস্ট",
            "অধ্যায়ভিত্তিক প্যারালাল টেক্সট ফ্রি!",
            "অভিজ্ঞ ও দক্ষ শিক্ষক দ্বারা পাঠদান"
        ]
    },
    {
        img: "/courses/8.png",
        title: "৮ম শ্রেণি একাডেমিক প্রোগ্রাম ২০২৬",
        items: [
            "সপ্তাহে ৬ দিন লেকচার ক্লাস",
            "ডেইলি MCQ এক্সাম",
            "প্রতি সপ্তাহে অধ্যায়ভিত্তিক এক্সাম",
            "স্পেশাল ইভ্যালুয়েশন মডেল টেস্ট",
            "অধ্যায়ভিত্তিক প্যারালাল টেক্সট ফ্রি!",
            "অভিজ্ঞ ও দক্ষ শিক্ষক দ্বারা পাঠদান"
        ]
    },
    {
        img: "/courses/9.png",
        title: "৯ম শ্রেণি একাডেমিক প্রোগ্রাম ২০২৬",
        items: [
            "সপ্তাহে ৬ দিন লেকচার ক্লাস",
            "ডেইলি MCQ এক্সাম",
            "প্রতি সপ্তাহে অধ্যায়ভিত্তিক এক্সাম",
            "স্পেশাল ইভ্যালুয়েশন মডেল টেস্ট",
            "অধ্যায়ভিত্তিক প্যারালাল টেক্সট ফ্রি!",
            "অভিজ্ঞ ও দক্ষ শিক্ষক দ্বারা পাঠদান"
        ]
    },
    {
        img: "/courses/10.png",
        title: "১০ম শ্রেণি একাডেমিক প্রোগ্রাম ২০২৬",
        items: [
            "সপ্তাহে ৬ দিন লেকচার ক্লাস",
            "ডেইলি MCQ এক্সাম",
            "প্রতি সপ্তাহে অধ্যায়ভিত্তিক এক্সাম",
            "স্পেশাল ইভ্যালুয়েশন মডেল টেস্ট",
            "অধ্যায়ভিত্তিক প্যারালাল টেক্সট ফ্রি!",
            "অভিজ্ঞ ও দক্ষ শিক্ষক দ্বারা পাঠদান"
        ]
    },
    {
        img: "/courses/10c.png",
        title: "SSC ২০২৬ মডেল টেস্ট প্রোগ্রাম",
        items: [
            "বিষয়ভিত্তিক প্রশ্নব্যাংক",
            "অধ্যায়ভিত্তিক পরীক্ষা",
            "প্রিন্টেড সল্ভ শিট",
            "ফাইনাল সল্ভ ক্লাস",
            "ফাইনাল মডেল টেস্ট",
            "সার্বক্ষণিক Q & A সেবা"
        ]
    },
    {
        img: "/courses/12.png",
        title: "HSC 1st Year (HSC'27 ব্যাচের জন্য)",
        items: [
            "লাইভ ক্লাস: ২৭০টি (প্রতিদিন ডাবল ক্লাস)",
            "বোর্ড স্ট্যান্ডার্ড MCQ এক্সাম: ২৭০টি",
            "অধ্যায়ভিত্তিক CQ এক্সাম: ৪৪টি",
            "প্রি-এডমিশন MCQ এক্সাম: ৪৪টি",
            "কোর্স ফাইনাল এক্সাম: ৪টি",
            "বিষয়ভিত্তিক প্যারালাল টেক্সট: ৮টি"
        ]
    },
    {
        img: "/courses/12ict.png",
        title: "HSC ICT ফুল কোর্স",
        items: [
            "লেকচার ক্লাস: ৫৪টি",
            "ডেইলি এক্সাম: ৫৪টি",
            "মান্থলি এক্সাম: ৬টি",
            "সাবজেক্ট ফাইনাল এক্সাম: ১টি",
            "প্যারালাল টেক্সট: ১টি"
        ]
    }
];




const Course = () => {
    const course = courses;
    const navigate = useNavigate();

    const handleNavigation = (data) => {
        navigate('/admission')
    };

    return (
        <div id="course" className="w-full bg-[#F0FFFF] py-5">
            <div className="text-center mb-5">
                <h1 className="text-3xl font-bold font-['SolaimanLipi']">আমাদের প্রোগ্রাম সমূহ</h1> {/*কোর্সসমূহ*/}
            </div>

            <div className="w-full maxw grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center md:justify-between items-center gap-5 p-5">
                {
                    course.map((e, i) => (
                        <div
                            key={i}
                            className=" bg-white rounded-[10px] overflow-hidden self-stretch shadow-[0px_50px_100px_-20px_rgba(50,50,93,0.25),0px_30px_60px_-30px_rgba(0,0,0,0.3)] transition-all"
                        >
                            <img src={e.img} alt="" className="w-full" />
                            <div className="p-2 ">
                                <h1 className="font-bold font-[SolaimanLipi] my-2 text-2xl">
                                    {e.title}
                                </h1>
                                <ul className="list-inside">
                                    {
                                        e.items.map((item, index) => (
                                            <li
                                                key={index}
                                                className="text-gray-800 px-[5px] font-['SolaimanLipi'] mb-4 flex items-start"
                                            >
                                                <span className="text-[23px] text-black mr-[5px] leading-none">✓</span>
                                                <span className="relative font-bold left-[5px]">{item}</span>
                                            </li>
                                        ))
                                    }
                                </ul>

                                <button
                                    onClick={() => handleNavigation(e)}
                                    className="block bg-[#f0f8ff] text-black text-[18px] border-2 border-grey py-2 px-[15px] rounded-[5px] text-center mt-[10px] w-full cursor-pointer hover:bg-gray-100 transition-colors"
                                >
                                    ভর্তি আবেদন করুন
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Course;
