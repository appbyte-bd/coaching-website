import React from 'react';

const Counter = () => {
    const counterItems = [
        {
            id: 1, icon: "fas fa-users", count: "8000+", label: "Students"
        },
        {
            id: 2, icon: "fas fa-book-open-reader", count: "20+", label: "Courses"
        },
        {
            id: 3, icon: "fas fa-chalkboard-user", count: "100+", label: "Teachers"
        },
        {
            id: 4, icon: "fas fa-user-graduate", count: "2000+", label: "Active Students"
        },
    ];

    return (
        <section
            id="counter"
            className="w-full py-2.5 my-4"
        >
            <div
                className="w-full maxw flex flex-wrap justify-center items-center gap-2.5 px-2 md:px-0">
                {counterItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col items-center justify-between bg-white shadow-lg p-5 rounded-md w-[90%] min-[400px]:w-[45%] md:flex-1 md:w-auto md:self-stretch transition-transform hover:-translate-y-1 duration-300">
                        <i className={`${item.icon} text-3xl text-slate-700 mb-2`}></i>
                        <div className="text-center mt-5">
                            <h3 className="text-2xl font-bold text-slate-800">{item.count}</h3>
                            <p className="text-slate-600 font-medium">{item.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Counter;
