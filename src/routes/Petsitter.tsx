import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { useAuth } from "../lib/auth";
import { getDoc } from 'firebase/firestore/lite';

// Define the interface for petsitter data
interface PetsitterData {
  name: string;
  bio: string;
  fee: string;
  // Add more fields as needed
}

// Define the interface for review data, customize as needed
interface ReviewData {
  reviewerName: string;
  comment: string;
  // Add more fields as needed
}

const Petsitter: React.FC = () => {
    const { user } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [petsitterData, setPetsitterData] = useState<PetsitterData>({
        name: "",
        bio: '',
        fee: ''
    });
    const [reviews, setReviews] = useState<ReviewData[]>([]);

    useEffect(() => {
        const fetchPetsitterData = async () => {
            const petsitterEmail = user?.email;
            if (petsitterEmail) {
                const docRef = doc(db, 'petsitters', petsitterEmail);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setPetsitterData(docSnap.data() as PetsitterData);
                } else {
                    console.log("No such document!");
                }
            }
        };

        const fetchReviews = async () => {
            // Implement review fetching logic here
            // For example, assuming there is a 'reviews' subcollection under each petsitter document
            const reviewsCollectionRef = collection(db, 'petsitters', user?.email || 'undefined', 'reviews');
            const querySnapshot = await getDocs(reviewsCollectionRef);
            const fetchedReviews: ReviewData[] = [];
            querySnapshot.forEach((doc) => {
                fetchedReviews.push(doc.data() as ReviewData);
            });
            setReviews(fetchedReviews);
        };

        fetchPetsitterData();
        fetchReviews();
    }, [user]);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditing(false);
        
        const petsitterEmail = user?.email;
        if (petsitterEmail) {
            await setDoc(doc(db, 'petsitters', petsitterEmail), petsitterData, { merge: true });
        }
    };

    return (
        <div className="container mx-auto mt-8 pt-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-md mb-8">
                <div className="p-6 text-center">
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className="w-full p-2 rounded border border-gray-300 mb-2"
                                value={petsitterData.name}
                                onChange={e => setPetsitterData({ ...petsitterData, name: e.target.value })}
                                placeholder="Name"
                                autoFocus
                            />
                            <textarea
                                className="w-full p-2 rounded border border-gray-300 mb-2"
                                value={petsitterData.bio}
                                onChange={e => setPetsitterData({ ...petsitterData, bio: e.target.value })}
                                placeholder="Bio"
                            />
                            <input
                                type="text"
                                className="w-full p-2 rounded border border-gray-300 mb-2"
                                value={petsitterData.fee}
                                onChange={e => setPetsitterData({ ...petsitterData, fee: e.target.value })}
                                placeholder="Service Fee"
                            />
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Save
                            </button>
                        </form>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold mb-2">{petsitterData.name}</h1>
                            <p>{petsitterData.bio}</p>
                            <p>Fee: {petsitterData.fee}</p>
                            <button onClick={handleEditClick} className="mt-4 ml-auto px-4 py-2 bg-#333 text-white rounded">
                                {isEditing ? 'Cancel' : 'Edit Profile'}
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <h2 className="text-xl font-bold ml-4 mt-4 mb-4">Reviews</h2>
                <div className="p-6">
                    {reviews.map((review, index) => (
                        <div key={index} className="mb-4">
                            <p className="font-bold">{review.reviewerName}</p>
                            <p>{review.comment}</p>
                            {/* Additional review details */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Petsitter;
