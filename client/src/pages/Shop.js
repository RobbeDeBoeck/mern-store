import React, { useEffect, useState } from "react";

import Alert from "../components/Alert";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";

import { fetch, useQuery } from "../config/functions";
import { API_URL } from "../config/config";

export default function Shop() {
  const query = useQuery();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(query.get("cat") || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const options = { query: { page, limit, q: search, cat: category } };
        const res = await fetch(`${API_URL}/products`, options);
        setProducts(res.data);
        setPages(res.pages);
      } catch (err) {
        const res = err.response;
        setError(`${res.status} - ${res.statusText}`);
      }
    }

    async function fetchCategories() {
      try {
        const res = await fetch(`${API_URL}/categories`);
        setCategories(res);
      } catch (err) {
        const res = err.response;
        setError(`${res.status} - ${res.statusText}`);
      }
    }

    setLoading(true);
    if (!categories.length) fetchCategories();
    fetchProducts();
    setLoading(false);
  }, [page, limit, search, category, categories.length]);

  return (
    <>
      <Alert show={error !== null} danger onClose={() => setError(null)}>
        {error}
      </Alert>
      <Loader show={loading} />
      <div className="container mx-auto">
        <div className="flex justify-center items-baseline mb-6">
          <div className="relative flex-grow">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
            <input
              className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:shadow-outline"
              type="search"
              placeholder="Search"
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            value={category}
            className="px-6 py-2 ml-6 border rounded-md focus:shadow-outline"
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories.map(c => (
              <option value={c._id} key={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            defaultValue={12}
            className="px-6 py-2 ml-6 border rounded-md focus:shadow-outline"
            onChange={e => setLimit(e.target.value)}
          >
            <option>4</option>
            <option>8</option>
            <option>12</option>
          </select>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map(p => (
            <ProductCard product={p} key={p._id} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Pagination current={page} pageAmount={pages} onClick={pNr => setPage(pNr)} />
        </div>
      </div>
    </>
  );
}
