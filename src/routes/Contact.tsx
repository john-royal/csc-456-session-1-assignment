import React, { useState } from 'react';
import {db} from '../lib/firebase';
import {addDoc, collection} from 'firebase/firestore';


function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const userCollectionRef = collection(db, "contactdata");

    const [formErrors, setFormErrors] = useState({
        name: false,
        email: false,
        message: false,
    });

    const [showToast, setShowToast] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors = {
            name: formData.name === '',
            email: formData.email === '',
            message: formData.message === '',
        };

        setFormErrors(errors);

        if (Object.values(errors).some((error) => error)) {
            return;
        }

        addDoc(userCollectionRef, {
            name: formData.name,
            email: formData.email,
            message: formData.message,
        }). then(()=>{
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 8000);
        }).catch((error)=>{
            console.log(error.message)
        })

        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <div className="contact__wrapper">
            <div className="fixed top-20 end-5 p-3 z-50">
                {showToast && (
                    <div className="bg-green-500 text-white font-bold rounded-lg border shadow-lg p-4 top- right-0 m-4">
                        Message Sent!
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="shadow p-5 bg-white rounded w-full max-w-md mx-auto mt-20">
                <div className="text-center text-3xl font-bold mb-4">Contact Us</div>

                <div className="mb-4">
                    <label className="block mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`input input-bordered w-full ${formErrors.name && 'border-red-500'}`}
                        placeholder="Enter your name"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`input input-bordered w-full ${formErrors.email && 'border-red-500'}`}
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Message</label>
                    <textarea
                        rows={3}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={`input input-bordered w-full ${formErrors.message && 'border-red-500'}`}
                        placeholder="Enter your message"
                    />
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary bg-black">Send Message</button>
                </div>
            </form>
        </div>
    );
}

export default Contact;
