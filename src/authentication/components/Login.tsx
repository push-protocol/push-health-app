import { FC } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "sonner";
import { Box, Button, TextInput, PushLogo, Text } from "blocks";

import { LoginformValues } from "../authentication.types";
import { useLogin } from "../hooks/useLogin";
import { AppView } from "../../common";

export type LoginProps = {
  handleSetActiveView: (component: AppView) => void;
};

const Login: FC<LoginProps> = ({ handleSetActiveView }) => {
  const { login, isLoading } = useLogin();

  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik<LoginformValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin({ ...values });
    },
  });

  const handleLogin = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    login(
      {
        username,
        password,
      },
      {
        onSuccess: (response) => {
          if (response.data.token) {
            handleSetActiveView("dashboard");
          }
        },
        onError: (error: any) => {
          if (error.name) {
            toast.error(error.response.data.error);
          }
        },
      }
    );
  };

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
          Push Health App Login
        </Text>
        <Box width="100%">
          <form onSubmit={formik.handleSubmit}>
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              gap="spacing-xs"
              width="100%"
            >
              <Box width="100%">
                <TextInput
                  placeholder="User"
                  value={formik.values.username}
                  disabled={isLoading}
                  onChange={formik.handleChange("username")}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  errorMessage={
                    formik.touched.username ? formik.errors.username : ""
                  }
                />
              </Box>

              <Box width="100%">
                <TextInput
                  type="password"
                  placeholder="Password"
                  disabled={isLoading}
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  errorMessage={
                    formik.touched.password ? formik.errors.password : ""
                  }
                />
              </Box>
              <Box margin="spacing-md spacing-none spacing-none spacing-none">
                <Button disabled={isLoading}>
                  {isLoading ? "Authenticating" : "Login"}
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export { Login };
