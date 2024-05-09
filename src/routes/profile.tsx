import React, { useState } from "react";

import EditProfileDialog from "~/components/edit-profile-dialog";
import LoadingScreen from "~/components/loading";
import NewPostDialog from "~/components/post/new-post-dialog";
import PostItem from "~/components/post/post-item";
import { Button } from "~/components/ui/button";
import { usePostsByUser } from "~/data/post";
import { useUser } from "~/lib/auth";

const ProfilePage: React.FC = () => {
  const user = useUser();
  const userPosts = usePostsByUser(user.uid);

  const [isPostDialogOpen, setPostDialogOpen] = useState(false);
  const [isEditingProfile, setEditingProfile] = useState(false);

  if (!userPosts.data) {
    return <LoadingScreen />;
  }

  return (
    <>
      <EditProfileDialog
        open={isEditingProfile}
        onOpenChange={setEditingProfile}
      />
      <NewPostDialog open={isPostDialogOpen} onOpenChange={setPostDialogOpen} />

      <div className="container mx-auto mt-8 pt-8">
        <div className="mx-auto max-w-3xl">
          {/* Profile section */}
          <div className="mb-8 overflow-hidden rounded-xl bg-white shadow-md">
            <div className="p-6 text-center">
              {/* User profile image */}
              <div className="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full bg-gray-200">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={user?.profilePicURL ?? undefined}
                  alt="Profile"
                />
              </div>
              <div className="mb-4 text-center">
                <h1 className="mb-2 text-2xl font-bold">{user.username}</h1>
                <p className="mt-2">{user.bio}</p>
              </div>
              <div className="mx-auto flex w-fit gap-x-2">
                <Button onClick={() => setEditingProfile(true)}>
                  Edit Profile
                </Button>
                <Button onClick={() => setPostDialogOpen(true)}>
                  Create New Post
                </Button>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl bg-white shadow-md">
            <h2 className="mb-4 ml-4 mt-4 text-xl font-bold">Posts</h2>
            <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 md:grid-cols-3">
              {userPosts.data.map((post, index) => (
                <PostItem key={index} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
