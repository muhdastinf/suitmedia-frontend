"use client";

import Header from "@/components/Header";
import PostList from "@/components/PostList";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-lvh flex-col">
        <h1 className="font-bold text-2xl">Welcome to About Page</h1>
        <h1 className="font-semibold text-lg text-gray-400">Click "Ideas" to see all ideas</h1>
      </div>
    </div>
  );
}
