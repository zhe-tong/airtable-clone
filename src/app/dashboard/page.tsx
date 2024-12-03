"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // 用于导航

type Base = {
  id: string;
  name: string;
};

export default function DashboardPage() {
  const [bases, setBases] = useState<Base[]>([]);
  const router = useRouter(); // 初始化路由

  // 获取所有 Bases 的函数
  const fetchBases = async () => {
    try {
      const response = await fetch("/api/getBase", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setBases(data); // 如果数据为空，则设置为空数组
      } else {
        console.error("Failed to fetch bases");
      }
    } catch (error) {
      console.error("Error fetching bases:", error);
      // 即使发生错误，也不展示错误提示，只保持空数组
      setBases([]);
    }
  };

  // 页面加载时获取 Bases
  useEffect(() => {
    fetchBases();
  }, []);

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

  const goToBase = (id: string) => {
    // 跳转到动态路由页面
    router.push(`/base/${id}`);
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
        {/* 如果有数据就展示，否则什么也不展示 */}
        {bases.length > 0 &&
          bases.map((base) => (
            <button
              key={base.id}
              onClick={() => goToBase(base.id)} // 点击跳转到动态路由页面
              className="p-4 border rounded bg-white text-left w-full"
            >
              <h3 className="font-medium">{base.name}</h3>
            </button>
          ))}
      </div>
    </div>
  );
}
