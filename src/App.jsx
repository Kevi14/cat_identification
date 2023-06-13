import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { store, persistor } from "./store/store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import PublicLayout from "./components/Layouts/PublicLayout";
import CatBreedIdentifier from "./pages/CatBreedIdentifier";
import CatGallery from "./pages/Gallery";
const routes = [
  {
    path: "/",
    component: Home,
    layout: PublicLayout, // Specify the layout component for this route
  },
  {
    path: "/login",
    component: Login,
    layout: PublicLayout,
  },
  {
    path: "/register",
    component: Register,
    layout: PublicLayout,
  },
  {
    path: "/profile",
    component: Profile,
    layout: PublicLayout,
  },
  {
    path: "/identify",
    component: CatBreedIdentifier,
    layout: PublicLayout,
  },
  {
    path: "/gallery",
    component: CatGallery,
    layout: PublicLayout,
  },
];

const router = createBrowserRouter(
  routes.map((route) => ({
    path: route.path,
    element: (
      <route.layout>
        <route.component />
      </route.layout>
    ),
  }))
);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
