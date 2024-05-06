import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import type { Post, UserProfile } from "~/lib/schema";
import LoadingScreen from "~/components/loading";
import PostItem from "~/components/post-item";
import { useAuth } from "~/lib/auth";
import { posts, users } from "~/lib/repositories";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [submitPost, setSubmitPost] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  const [userData, setUserData] = useState<UserProfile>();

  useEffect(() => {
    if (!user?.email) {
      return;
    }

    const unsubscribeUser = users.subscribe(
      (collection, { query, where }) =>
        query(collection, where("email", "==", user.email)),
      (data) => {
        setUserData(data[0]);
      },
    );
    const unsubscribePosts = posts.subscribe(
      (collection, { query, where }) =>
        query(collection, where("id", "==", user.email)),
      (data) => {
        setUserPosts(data);
      },
    );

    return () => {
      unsubscribeUser();
      unsubscribePosts();
    };
  }, [user?.email]);

  // Handler for edit button click
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Handler for form submission
  // update the user profile bio
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);

    if (!user?.email || !userData) {
      return;
    }

    users
      .set(user.email, {
        username: userData.username,
        bio: userData.bio,
      })
      .then(() => {
        console.log("User data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setSubmitPost(true);
    }
  };

  const handleCreatePostClick = async () => {
    if (!user?.email || !userData) {
      alert("You must be logged in to create a post.");
      return;
    }

    if (!selectedImage) {
      alert("Please select an image.");
      return;
    }

    try {
      // Upload image to Firebase Storage

      const storage = getStorage();
      const imgRef = ref(
        storage,
        "postImages/" +
          user?.email +
          "/" +
          selectedImage.name +
          (Math.floor(Math.random() * 1000) + 1),
      );
      const snapshot = await uploadBytes(imgRef, selectedImage);
      const url = await getDownloadURL(snapshot.ref);
      console.log("upload after: ", url);

      await posts.add({
        id: user.email,
        user: {
          id: userData.email,
          username: userData.username,
          imageUrl: userData.profilePicURL,
        },
        imageUrl: url,
      });

      setSelectedImage(null);
      setSubmitPost(false);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post.");
    }
  };

  if (!userData) {
    return <LoadingScreen />;
  }

  return (
    <div className="container mx-auto mt-8 pt-8">
      <div className="mx-auto max-w-3xl">
        {/* Profile section */}
        <div className="mb-8 overflow-hidden rounded-xl bg-white shadow-md">
          <div className="p-6 text-center">
            {/* User profile image */}
            <div className="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full bg-gray-200">
              <img
                className="h-full w-full rounded-full object-cover"
                src="/images/dogProf.png"
                alt="Profile"
              />
            </div>
            {/* User profile info */}
            <div className="text-center">
              {isEditing ? (
                <form onSubmit={handleProfileSubmit}>
                  <input
                    type="text"
                    className="mb-2 w-full rounded border border-gray-300 p-2"
                    value={userData.username}
                    onChange={(e) =>
                      setUserData({ ...userData, username: e.target.value })
                    }
                    autoFocus
                  />
                  <textarea
                    className="mb-2 w-full rounded border border-gray-300 p-2"
                    value={userData.bio}
                    onChange={(e) =>
                      setUserData({ ...userData, bio: e.target.value })
                    }
                  />
                  <button
                    type="submit"
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  >
                    Save
                  </button>
                </form>
              ) : (
                <>
                  <h1 className="mb-2 text-2xl font-bold">
                    {userData.username}
                  </h1>
                  <p className="mt-2">{userData.bio}</p>
                </>
              )}
            </div>
            {/* Edit button */}
            <button
              className="bg-#333 ml-auto mt-4 rounded px-4 py-2 text-white"
              onClick={handleEditClick}
            >
              {isEditing ? "Cancel" : "Edit Your Profile"}
            </button>

            {/* File input field for selecting image */}
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="ml-4 mt-4 cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Create a New Post
            </label>

            {/* Submit Post button (conditionally rendered) */}
            {submitPost && (
              <button
                onClick={handleCreatePostClick}
                className="bg-#333 ml-4 mt-4 rounded px-4 py-2 text-white"
              >
                Submit Post
              </button>
            )}
          </div>
        </div>
        {/* Posts section */}
        <div className="overflow-hidden rounded-xl bg-white shadow-md">
          <h2 className="mb-4 ml-4 mt-4 text-xl font-bold">Posts</h2>
          <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 md:grid-cols-3">
            {userPosts.map((post, index) => (
              <PostItem key={index} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
