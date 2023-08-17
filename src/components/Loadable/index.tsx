import { Suspense, FC } from "react";
import Loader from "./Loader";
import { JSX } from "react/jsx-runtime";

/** 异步加载，加载条加载 */
const Loadable = (Component: FC) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
