import { useState } from "react";
import axios from "axios";
import { Box, PushLogo, Text, Button } from "../../blocks";
import { ActivityStatus } from "../dashboard.types";
import { ActivityItem } from "./ActivityItem";

const Dashboard = () => {
  const [channelListStatus, setChannelListStatus] =
    useState<ActivityStatus>("idle");

  const [notificationListStatus, setNotificationListStatus] =
    useState<ActivityStatus>("idle");

  const [notificationStreamStatus, setNotificationStreamStatus] =
    useState<ActivityStatus>("idle");

  const [sendChatMessageStatus, setSendChatMessageStatus] =
    useState<ActivityStatus>("idle");

  const [chatMessageStreamStatus, setChatMessageStreamStatus] =
    useState<ActivityStatus>("idle");

  const [activityListStatus, setActivityListStatus] =
    useState<ActivityStatus>("idle");

  const [claimActivityStream, setClaimActivityStream] =
    useState<ActivityStatus>("idle");

  const handleGetChannels = () => {
    setChannelListStatus("loading");
    axios({
      method: "GET",
      url: "https://backend.epns.io/apis/v1/channels?page=1&limit=30&order=desc&sort=subscribers",
    })
      .then((response) => {
        if (response.data?.channels.length) {
          setChannelListStatus("success");
        }
      })
      .catch((error) => {
        setChannelListStatus("error");
      });
  };

  const handleGetNotifications = () => {
    setNotificationListStatus("loading");
    axios({
      method: "GET",
      url: "https://backend.epns.io/apis/v1/users/eip155:1:0x78bB82699f030195AC5B94C6c0dc9977050213c7/feeds?page=1&limit=10&spam=false",
    })
      .then((response) => {
        if (response.data?.feeds.length) {
          setNotificationListStatus("success");
        }
      })
      .catch((error) => {
        setNotificationListStatus("error");
      });
  };

  const handleGetAllRewardActivities = () => {
    setActivityListStatus("loading");
    axios({
      method: "GET",
      url: "https://us-east1-push-prod-apps.cloudfunctions.net/pushpointsrewardsystem/activities/all?pageSize=100",
    })
      .then((response) => {
        if (response.data?.activities.length) {
          setActivityListStatus("success");
        }
      })
      .catch((error) => {
        setActivityListStatus("error");
      });
  };

  const handleRunHealthCheck = () => {
    handleGetChannels();
    handleGetNotifications();
    handleGetAllRewardActivities();
  };

  const isRunningHealthChecks = channelListStatus === "loading";
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      gap="spacing-xxl"
      margin="spacing-xxl spacing-none spacing-none spacing-none"
    >
      <Box display="flex" gap="spacing-xxxs" alignItems="center">
        <PushLogo />
        <Text variant="h2-semibold" color="text-primary">
          Push
        </Text>
      </Box>
      <Box
        width="374px"
        display="flex"
        alignItems="center"
        padding="spacing-md"
        flexDirection="column"
        gap="spacing-md"
        backgroundColor="surface-primary"
        borderRadius="radius-md"
      >
        <Text variant="h4-bold" color="text-primary">
          Push Service's Health Checks
        </Text>
        <Box width="100%">
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            gap="spacing-xs"
            width="100%"
          >
            <ActivityItem
              label="Channels Retrieval Service"
              status={channelListStatus}
            />

            <ActivityItem
              label="Notification Retrieval Service"
              status={notificationListStatus}
            />

            <ActivityItem
              label="Notification Stream Service"
              status={notificationStreamStatus}
            />

            <ActivityItem
              label="Send Chat Message Service"
              status={sendChatMessageStatus}
            />

            <ActivityItem
              label="Chat Message Stream Service"
              status={chatMessageStreamStatus}
            />

            <ActivityItem
              label="Rewards Retrieval Service"
              status={activityListStatus}
            />

            <ActivityItem
              label="Claims Retrieval Service"
              status={claimActivityStream}
            />

            <Box
              margin="spacing-md spacing-none spacing-none spacing-none"
              width="100%"
            >
              <Button
                block
                onClick={handleRunHealthCheck}
                disabled={isRunningHealthChecks}
              >
                Run Status Checks
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export { Dashboard };
