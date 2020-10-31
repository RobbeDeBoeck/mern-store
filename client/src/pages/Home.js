import React, { useEffect, useState } from "react";

import Alert from "../components/Alert";
import Loader from "../components/Loader";
import CategoryCard from "../components/CategoryCard";

import { API_URL } from "../config/config";
import { fetch } from "../config/functions";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${API_URL}/categories`);
        setCategories(res);
      } catch (err) {
        const res = err.response;
        if (res) setError(`${res.status} - ${res.statusText}`);
        else setError(err.message);
      }
    }
    setLoading(true);
    fetchCategories();
    setLoading(false);
  }, []);

  return (
    <>
      <Alert show={error !== null} danger onClose={() => setError(null)}>
        {error}
      </Alert>
      <Loader show={loading} />
      <div className="container mx-auto px-6">
        <div className="md:flex md:-mx-4 flex-wrap">
          {categories.map((c, i) => (
            <CategoryCard category={c} half={i > 0 || categories.length % 2 === 0} key={c._id} />
          ))}
        </div>
      </div>
    </>
  );
}
