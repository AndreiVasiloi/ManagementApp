import React from "react";
import { Tab } from "semantic-ui-react";
import AboutTab from "./AboutTab";
import ChangePasswordTab from "./ChangePasswordTab";
import PhotosTab from "./PhotosTab";

export default function ProfileContent({ profile, isCurrentUser }) {
  const panes = [
    {
      menuItem: "About",
      render: () => (
        <AboutTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: "Photos",
      render: () => (
        <PhotosTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: "Change Password",
      render: () => (
        <ChangePasswordTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
  ];

  return (
    <Tab
      panes={panes}
    />
  );
}
