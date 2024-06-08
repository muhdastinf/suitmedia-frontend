import { useEffect, useState } from "react";
import axios from "axios";
import { IPost } from "@/types/post.type";

const PostList = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [sort, setSort] = useState(() => localStorage.getItem("sort") || "-published_at");
  const [pageSize, setPageSize] = useState(() => parseInt(localStorage.getItem("pageSize") || "10"));
  const [pageNumber, setPageNumber] = useState(() => parseInt(localStorage.getItem("pageNumber") || "1"));
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(totalItems / pageSize);

  const fetchPosts = async () => {
    const response = await axios.get(
      `https://suitmedia-backend.suitdev.com/api/ideas`,
      {
        params: {
          "page[number]": pageNumber,
          "page[size]": pageSize,
          append: ["small_image", "medium_image"],
          sort,
        },
      }
    );
    setPosts(response.data.data);
    setTotalItems(response.data.meta.total);
  };

  useEffect(() => {
    localStorage.setItem("sort", sort);
    localStorage.setItem("pageSize", pageSize.toString());
    localStorage.setItem("pageNumber", pageNumber.toString());
    fetchPosts();
  }, [sort, pageSize, pageNumber]);

  const handlePrev = () => {
    setPageNumber(Math.max(1, pageNumber - 1));
  };

  const handleNext = () => {
    setPageNumber(Math.min(totalPages, pageNumber + 1));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold">
          Showing {posts.length} of {totalItems}
        </h1>
        <div className="">
          <select
            onChange={(e) => setPageSize(Number(e.target.value))}
            value={pageSize}
            className="mr-4 border border-gray-500 rounded-full py-2 px-4"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <select
            onChange={(e) => setSort(e.target.value)}
            value={sort}
            className="border border-gray-500 rounded-full py-2 px-4"
          >
            <option value="-published_at">Newest</option>
            <option value="published_at">Oldest</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-2 rounded-lg shadow-lg">
            <img
              src={post.small_image[0]?.url}
              alt={post.small_image[0]?.file_name}
              loading="lazy"
              className="w-full h-52 object-cover rounded-t-md"
            />
            <div className="p-2">
              <p className="text-gray-500 font-semibold text-sm my-1">
                {new Date(post.published_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h2 className="text-lg font-semibold line-clamp-3">
                {post.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-10 space-x-3">
        <button
          onClick={handlePrev}
          disabled={pageNumber === 1}
          className="px-4 py-2 font-bold bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2 rounded-lg bg-gray-300">
          {pageNumber} / {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={pageNumber === totalPages}
          className="px-4 py-2 font-bold bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostList;
