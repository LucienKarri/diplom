import { Typography } from "antd";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();

  console.error("logged error >", error);

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <Typography.Title>Oops! {error.status}</Typography.Title>
        <Typography.Text>{error.statusText}</Typography.Text>
        {error.data?.message && (
          <Typography.Text>{error.data.message}</Typography.Text>
        )}
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <Typography.Title>Oops! Unexpected Error</Typography.Title>
        <Typography.Text>Something went wrong.</Typography.Text>
        <Typography.Text>{error.message}</Typography.Text>
      </div>
    );
  } else {
    return <>Oops! Something went wrong.</>;
  }
};
