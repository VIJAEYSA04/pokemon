import React,{ StrictMode,Suspense } from "react";
import { createRoot } from "react-dom/client";
const MyComponent = React.lazy(() => import('./App'));


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
   <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
   
  </StrictMode>
);
