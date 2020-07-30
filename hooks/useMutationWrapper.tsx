import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useMutation } from "@apollo/react-hooks";
import { DocumentNode } from "graphql";
type CustomSnackbarProps = {
  open: boolean;
  text: string;
  severity: "success" | "error";
  onClose: () => void;
};
type HookProps = {
  gql: DocumentNode;
  successText: string;
};
type ErrorWrapper = {
  visibility: boolean;
  error?: string;
  errorComponent?: React.ReactElement;
};
type HookReturn<A, B> = [
  // (options?: MutationOptions<A, B>) => Promise<ExecutionResult<A>>,
  any,
  A | null,
  ErrorWrapper | null,
  React.ReactElement,
  React.ReactElement
];
const CustomSnackbar = (props: CustomSnackbarProps) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={() => {
        props.onClose();
      }}
    >
      <MuiAlert
        onClose={() => {
          props.onClose();
        }}
        severity={props.severity}
      >
        {props.text}
      </MuiAlert>
    </Snackbar>
  );
};

const useMutationWrapper = <A, B>(props: HookProps): HookReturn<A, B> => {
  const [mutation, { data, loading, error }] = useMutation<A, B>(props.gql);

  const [successVisibility, setSuccessVisibility] = useState(false);
  const [errorWrapper, setErrorWrapper] = useState<ErrorWrapper>({
    visibility: false,
  });
  const loader = loading ? <CircularProgress /> : <span />;
  const successComponent = (
    <CustomSnackbar
      open={successVisibility}
      severity={"success"}
      text={props.successText}
      onClose={() => setSuccessVisibility(false)}
    />
  );
  // <div className="loader-container">
  //   <style jsx>
  //     {`
  //       .loader-container {
  //         display: flex;
  //         min-height: 50vh;
  //         justify-content: center;
  //         align-items: center;
  //       }
  //     `}
  //   </style>
  // </div>
  useEffect(() => {
    if (data) {
      const methodName = Object.keys(data)[0];
      if (data[methodName].success) {
        props.successText ? setSuccessVisibility(true) : null;
      }
    } else if (error) {
      const formattedError = error.message.replace("GraphQL error: ", "");
      setErrorWrapper({
        visibility: true,
        error: formattedError,
        errorComponent: (
          <CustomSnackbar
            open={true}
            severity={"error"}
            text={formattedError}
            onClose={() =>
              setErrorWrapper({ ...errorWrapper, visibility: false })
            }
          />
        ),
      });
    }
  }, [loading]);
  return [mutation, data, errorWrapper, loader, successComponent];
};
export default useMutationWrapper;
