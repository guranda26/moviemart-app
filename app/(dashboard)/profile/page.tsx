"use client";

import React, { useState, useEffect } from "react";

interface ProfileParams {
  id: string;
  username: string;
  email: string;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<ProfileParams>();
  const [error, setError] = useState();
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/fetch-user");

      if (res.ok) {
        const profileResponse = await res.json();
        const { profile } = profileResponse;
        console.log("profile", profile);

        setProfile(profile);
      } else {
        const error = await res.json();
        console.log("error", error);

        setError(error);
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!profile) return <p>Loading...</p>;

  return (
    <section>
      <h2>Profile</h2>
      {/* <form action="">
        <input type="text" />
      </form> */}
      <p>{profile.id}</p>
      <p>{profile.username}</p>
      <p>{profile.email}</p>
    </section>
  );
};

export default ProfilePage;
