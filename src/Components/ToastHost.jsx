import { Suspense, lazy, useEffect } from "react";

const ToastContainer = lazy(() =>
  import("react-toastify").then((module) => ({ default: module.ToastContainer }))
);

function ToastHost() {
  useEffect(() => {
    import("react-toastify/dist/ReactToastify.css");
  }, []);

  return (
    <Suspense fallback={null}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Suspense>
  );
}

export default ToastHost;
