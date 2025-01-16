import { useState } from "react";
import axios from "axios";
import { LoginformValues } from "../authentication.types";

const rewardPointsProdBaseURL =
  "https://us-east1-push-prod-apps.cloudfunctions.net/pushpointsrewardsystem";

export const useLogin = () => {
  const [isLoading, setLoading] = useState(false);

  const login = (
    values: LoginformValues,
    {
      onSuccess,
      onError,
    }: { onSuccess: (response: any) => void; onError: (error: any) => void }
  ) => {
    setLoading(true);
    axios({
      method: "POST",
      url: `${rewardPointsProdBaseURL}/auth/login`,
      data: {
        username: values.username,
        password: values.password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setLoading(false);
        onSuccess(response);
      })
      .catch((error) => {
        setLoading(false);
        onError(error);
      });
  };

  return { isLoading, login };
};
