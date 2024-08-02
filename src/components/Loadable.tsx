import { Suspense, FC } from "react";
import { JSX } from "react/jsx-runtime";
import { LinearProgress, styled } from "@mui/material";

export const LoaderWrapper = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1301,
  width: "100%",
});

const Loader = () => (
  <LoaderWrapper>
    <LinearProgress color="primary" />
  </LoaderWrapper>
);

/** 异步加载，加载条加载 */
export const Loadable = (Component: FC) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
