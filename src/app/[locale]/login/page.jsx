"use client";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default  function LoginPage({ params }) {
  const [email, setEmail] = useState("user@demo.dev");
  const [password, setPassword] = useState("pass123");
  const { data } = useSWR("/api/auth/me", fetcher, { refreshInterval: 0 });

  async function onSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (res.ok)  window.location.href = `/${params.locale}/dashboard`;
  }

  return (
    <div className="max-w-sm">
      <h1 className="text-xl font-bold mb-2">Login</h1>
      <form onSubmit={onSubmit} className="space-y-2">
        <input
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
        />
        <button className="px-4 py-2 bg-black text-white rounded">
          Sign in
        </button>
      </form>
      <pre className="text-xs mt-4 bg-gray-100 p-2">
        Current: {JSON.stringify(data?.user || null)}
      </pre>
      <p className="text-xs mt-2">
        Try admin: <code>admin@demo.dev / pass123</code>
      </p>
    </div>
  );
}
