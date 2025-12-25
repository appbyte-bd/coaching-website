import { useState } from "react";
import { postApi } from "../../api";

const Contact = () => {
    const [data, setData] = useState({
        name: "",
        number: "",
        message: "",
    });
    const [messageState, setMessageState] = useState({ text: "", type: "" }); // type: "success" or "error"

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await postApi("/contact", data);
            setMessageState({ text: "Message sent successfully!", type: "success" });
            setData({ name: "", number: "", message: "" }); // Clear form
        } catch (error) {
            setMessageState({ text: "Failed to send message. Please try again.", type: "error" });
        }
    };

    return (
        <section id="contact" className="w-full py-10">
            <div className="container mx-auto w-full max-w-7xl bg-white p-6 shadow-lg">
                <div className="content flex flex-wrap items-center justify-between gap-6 md:flex-nowrap">
                    {/* Left side: details */}
                    <div className="left-side relative w-full flex-col items-center justify-center md:w-2/5">
                        <div className="details mb-4 text-center">
                            <i className="text-3xl text-indigo-600">📍</i>
                            <div className="topic text-lg font-medium">Address</div>
                            <div className="text-one text-sm text-indigo-500">Heyatpur Bazer Nawabgong Dinajpur</div>
                        </div>
                        <div className="details mb-4 text-center">
                            <i className="text-3xl text-indigo-600">📞</i>
                            <div className="topic text-lg font-medium">Phone</div>
                            <div className="text-one text-sm text-indigo-500">01822102751</div>
                        </div>
                        <div className="details mb-4 text-center">
                            <i className="text-3xl text-indigo-600">✉️</i>
                            <div className="topic text-lg font-medium">Email</div>
                            <div className="text-one text-sm text-indigo-500">istamim108@gmail.com</div>
                        </div>
                        <div className="absolute right-0 top-1/2 h-3/4 w-0.5 -translate-y-1/2 bg-gray-400 md:block"></div>
                    </div>

                    {/* Right side: form */}
                    <div className="right-side w-full md:w-3/5">
                        <div className="topic-text mb-4 text-2xl font-semibold text-indigo-600">
                            Send Us A Message...
                        </div>
                        {messageState.text && (
                            <div
                                className={`mb-4 rounded-md p-3 text-center ${messageState.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {messageState.text}
                            </div>
                        )}
                        <form onSubmit={handleClick}>
                            <div className="input-box mb-3">
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="h-14 w-full rounded-md border-none bg-slate-100 p-4 text-base outline-none"
                                />
                            </div>
                            <div className="input-box mb-3">
                                <input
                                    type="tel"
                                    name="number"
                                    value={data.number}
                                    onChange={handleChange}
                                    placeholder="Your Phone Number"
                                    className="h-14 w-full rounded-md border-none bg-slate-100 p-4 text-base outline-none"
                                />
                            </div>
                            <div className="input-box mb-3">
                                <textarea
                                    name="message"
                                    value={data.message}
                                    onChange={handleChange}
                                    placeholder="Message"
                                    rows="5"
                                    className="min-h-28 w-full rounded-md border-none bg-slate-100 p-4 text-base outline-none"
                                ></textarea>
                            </div>
                            <div className="button mt-4 flex justify-center">
                                <input
                                    type="submit"
                                    value="Send Message"
                                    className="rounded-md bg-indigo-600 px-6 py-2 text-white transition hover:bg-indigo-700"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
