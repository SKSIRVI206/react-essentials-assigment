# Custom React Hook & Product Catalog Project

A responsive React application built with **Vite**, **Tailwind CSS**, and a custom **`useFetch`** hook that simplifies fetching data from asynchronous APIs while cleanly managing loading states, error handling, and manual re-fetching.

---

## 📌 Project Features

- **Custom Hook (`useFetch`)**: API fetching logic into a reusable React hook.
- **State Management**: Automatically manages `data`, `loading`, and `error` states.
- **Performance Optimization**: Utilizes `useCallback` to memoize the fetch function and avoid unnecessary re-renders.
- **Re-fetch / Retry Support**: Exposes the `fetchData` function to allow users to retry fetching if a network or HTTP error occurs.
- **Robust Error Handling**: Safely formats and displays HTTP status codes and network failure messages without crashing the React UI.
- **Responsive Product Grid**: Uses Tailwind CSS grid layout to showcase products fetched from the Api (https://api.escuelajs.co/api/v1/products).

---
## 🚀 Live Demo
- **Netlify Deployment:** [https://react-custoom-hook.netlify.app/](https://react-custoom-hook.netlify.app/)
  
