"use client";

import { useState } from "react";

type Base = {
  id: number;
  name: string;
};

export default function DashboardPage() {
  const [bases, setBases] = useState<Base[]>([]);

  const createBase = async () => {
    const response = await fetch("/api/createBase", {
      method: "POST",
      body: JSON.stringify({ name: "New Base" }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const newBase = await response.json();
      setBases((prevBases) => [...prevBases, newBase]);
    } else {
      console.error("Failed to create base");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Bases</h1>
        <button
          onClick={createBase}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Create
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {bases.map((base) => (
          <div key={base.id} className="p-4 border rounded bg-white">
            <h3 className="font-medium">{base.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
