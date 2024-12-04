"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Base = {
  id: string;
  name: string;
};

function Sidebar({ createBase }: { createBase: () => void }) {
  return (
    <aside className="h-full w-[300px] bg-gray-100 flex flex-col border-r">
      {/* 顶部导航 */}
      <div className="p-4 font-bold text-lg border-b">Home</div>

      {/* 中间导航菜单 */}
      <nav className="flex-1 px-4">
      </nav>
      {/* 底部按钮 */}
      <div className="p-4">
        <button
          onClick={createBase}
          className="px-4 py-2 bg-blue-600 text-white rounded w-full"
        >
          Create
        </button>
      </div>
    </aside>
  );
}




export default function DashboardPage() {
  const [bases, setBases] = useState<Base[]>([]);
  const router = useRouter();

  const fetchBases = async () => {
    try {
      const response = await fetch("/api/getBase", { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setBases(data);
      } else {
        console.error("Failed to fetch bases");
      }
    } catch (error) {
      console.error("Error fetching bases:", error);
      setBases([]);
    }
  };

  useEffect(() => {
    fetchBases();
  }, []);

  const createBase = async () => {
    const response = await fetch("/api/createBase", {
      method: "POST",
      body: JSON.stringify({}),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const newBase = await response.json();
      setBases((prevBases) => [...prevBases, newBase]);
    } else {
      console.error("Failed to create base");
    }
  };

  const goToBase = (id: string) => {
    router.push(`/base/${id}`);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="flex flex-col h-full border ">
        <Sidebar createBase={createBase} />
      </div>
  
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="p-4">
          <div className="grid grid-cols-3 gap-4 mt-6">
            {bases.map((base) => (
              <button
                key={base.id}
                onClick={() => goToBase(base.id)}
                className="p-4 border rounded bg-white text-left w-full"
              >
                <h3 className="font-medium">{base.name}</h3>
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
  
}

