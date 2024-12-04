"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react"; // 新增，确保能用 React.use()

type Table = {
  id: string;
  name: string;
};

export default function BasePage({ params }: { params: Promise<{ baseId: string }> }) {
  const [tables, setTables] = useState<Table[]>([]);
  const [baseId, setBaseId] = useState<string | null>(null); // 用于存储解包后的 baseId
  const router = useRouter();

  // 解包 params
  useEffect(() => {
    async function unwrapParams() {
      const unwrappedParams = await params;
      setBaseId(unwrappedParams.baseId);
    }
    unwrapParams();
  }, [params]);

  // 获取 tables
  const fetchTables = async () => {
    if (!baseId) return; // 如果 baseId 尚未加载，不执行请求
    try {
      const response = await fetch(`/api/getTables?baseId=${baseId}`);
      if (response.ok) {
        const data = await response.json();
        setTables(data);
      }
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  // 创建 table
  const createTable = async () => {
    if (!baseId) return; // 如果 baseId 尚未加载，不执行请求
    try {
      const response = await fetch(`/api/createTable`, {
        method: "POST",
        body: JSON.stringify({ baseId }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const newTable = await response.json();
        setTables((prev) => [...prev, newTable]);
      }
    } catch (error) {
      console.error("Error creating table:", error);
    }
  };

  useEffect(() => {
    fetchTables();
  }, [baseId]); // 只有 baseId 加载后才触发

  if (!baseId) {
    return <div>Loading...</div>; // 在 baseId 未加载前显示加载状态
  }

  return (
    <div>
      <h1>Base {baseId}</h1>
      <button onClick={createTable} className="px-4 py-2 bg-blue-600 text-white rounded">
        Create Table
      </button>
      <div>
        {tables.map((table) => (
          <div key={table.id} onClick={() => router.push(`/base/${baseId}/table/${table.id}`)}>
            {table.name}
          </div>
        ))}
      </div>
    </div>
  );
}
