import { FC } from "react";
import {
  Box,
  ErrorFilled,
  Spinner,
  Text,
  TickCircleFilled,
} from "../../blocks";
import { ActivityStatus } from "../dashboard.types";

export type ActivityItemProps = {
  label: string;
  status: ActivityStatus;
};

const ActivityItem: FC<ActivityItemProps> = ({ status, label }) => {
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text variant="bl-semibold">{label}</Text>
      {status === "idle" && (
        <TickCircleFilled size={40} color="icon-tertiary" />
      )}
      {status === "loading" && (
        <Box height="40px">
          <Spinner size="large" variant="primary" />
        </Box>
      )}
      {status === "success" && (
        <TickCircleFilled size={40} color="icon-state-success-bold" />
      )}
      {status === "error" && (
        <ErrorFilled size={40} color="icon-state-danger-bold" />
      )}
    </Box>
  );
};

export { ActivityItem };
