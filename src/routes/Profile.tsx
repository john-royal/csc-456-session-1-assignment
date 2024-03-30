import React, { useState, useEffect } from 'react';
import {db} from '../lib/firebase';
import { collection, query, where, getDocs, getDoc, doc, setDoc} from "firebase/firestore";
import { useAuth } from "../lib/auth";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage";


const ProfilePage: React.FC = () => {
    const { user } = useAuth();

    // State to manage edit mode
    const [isEditing, setIsEditing] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [submitPost, setSubmitPost] = useState(false);
    const [imageList, setImageList] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUserEmail = user?.email;
                if (currentUserEmail) {

                    // method1: using query
                    // const q = query(collection(db, "users"), where("email", "==", currentUserEmail));
                    // const querySnapshot = await getDocs(q);
                    // querySnapshot.forEach((doc) => {
                    //     // Update userData state with the retrieved data
                    //     setUserData(doc.data() as { username: string, bio: string });
                    // });

                    // method 2: using document ref this is quick for single documentation retrival
                    const userRef = doc(db, "users", currentUserEmail);
                    const userdoc:any = await getDoc(userRef);

                    setUserData(userdoc.data() as { username: string, bio: string });

                } else {
                    console.log("User email is undefined");
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };


        fetchData();

        const storage = getStorage();
        const imgRef = ref(storage, "postImages/" + user?.email); 
        listAll(imgRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    //setImageList((prev) => [ ...prev, url])
                    imageList.push(url)
                })
            })
        })
        

        console.log(imageList)
    }, [db, user, imageList]);

    




    const [userData, setUserData] = useState({
        username: "",
        bio: '',
    });

    // Handler for edit button click
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    // Handler for form submission
    // update the user profile bio
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditing(false);
        // update the bio when the user clicks the save button


        const setData = async () => {
            try {
                const currentUserEmail = user?.email;
                if (currentUserEmail) {
                    const userRef = doc(db, 'users', currentUserEmail);
                    setDoc(userRef, {bio: userData.bio }, { merge: true });
                   
                } else {
                    console.log("User email is undefined when setting data");
                }
            } catch (error) {
                console.error('Error setting user data:', error);
            }
        };

        setData();

    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setSubmitPost(true);
        }
    };

    const handleCreatePostClick = async () => {
        // Ensure a file is selected
        if (!selectedImage) {
            alert('Please select an image.');
            return;
        }

        try {
            // Upload image to Firebase Storage
            
            const storage = getStorage();
            const imgRef = ref(storage, "postImages/" + user?.email + "/" + selectedImage.name + (Math.floor(Math.random() * 1000) + 1));
            const snapshot = await uploadBytes(imgRef, selectedImage);
            const url = await getDownloadURL(snapshot.ref);
            setImageList(prev => [...prev, url]);
            console.log("upload after: ", imageList);

            setSelectedImage(null);
            setSubmitPost(false);
            alert('Post created successfully!');
            

        
            //Create a new post document in Firestore
            // const currentUserEmail = user?.email;
            // if (currentUserEmail) {
            //     const postsCollectionRef = collection(db, 'posts');
            //     await setDoc(doc(postsCollectionRef), {
            //         id: currentUserEmail,
            //         username: userData.username,
            //         imageUrl: postList[postList.length-1],
            //         likeCount: 0,
            //         commentCount: 0,
            //         comments: []
            //     });
            // }
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post.');
        }
    };

    return (
        <div className="container mx-auto mt-8 pt-8">
            <div className="max-w-3xl mx-auto">
                {/* Profile section */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md mb-8">
                    <div className="p-6 text-center">
                        {/* User profile image */}
                        <div className="h-40 w-40 overflow-hidden bg-gray-200 rounded-full mb-4 mx-auto">
                            <img className="h-full w-full object-cover rounded-full" src="/images/dogProf.png" alt="Profile" />
                        </div>
                        {/* User profile info */}
                        <div className="text-center">
                            {isEditing ? (
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        className="w-full p-2 rounded border border-gray-300 mb-2"
                                        value={userData.username}
                                        onChange={e => setUserData({ ...userData, username: e.target.value })}
                                        autoFocus
                                    />
                                    <textarea
                                        className="w-full p-2 rounded border border-gray-300 mb-2"
                                        value={userData.bio}
                                        onChange={e => setUserData({ ...userData, bio: e.target.value })}
                                    />
                                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                        Save
                                    </button>
                                    
                                </form>
                            ) : (
                                <>
                                    <h1 className="text-2xl font-bold mb-2">{userData.username}</h1>
                                    <p className="mt-2">{userData.bio}</p>
                                </>
                            )}
                        </div>
                        {/* Edit button */}
                        <button
                            className="mt-4 ml-auto px-4 py-2 bg-#333 text-white rounded"
                            onClick={handleEditClick}
                        >
                            {isEditing ? 'Cancel' : 'Edit Your Profile'}
                        </button>

                       {/* File input field for selecting image */}
                       <input type="file" onChange={handleImageChange} accept="image/*" className="hidden" id="file-input" />
                        <label htmlFor="file-input" className="ml-4 mt-4 cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Create a New Post
                        </label>

                        {/* Submit Post button (conditionally rendered) */}
                        {submitPost && (
                            <button onClick={handleCreatePostClick} className="ml-4 mt-4 px-4 py-2 bg-#333 text-white rounded">
                                Submit Post
                            </button>
                        )}
                    </div>
                </div>
                {/* Posts section */}
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                    <div className="p-6">
                        <h2 className="text-xl font-bold mb-4">Posts</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Sample posts */}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
