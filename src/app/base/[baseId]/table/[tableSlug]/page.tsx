"use client";

import { useState, useEffect } from "react";

type Table = {
  id: string;
  name: string;
};

export default function TablePage({ params }: { params: { baseId: string; tableId: string } }) {
  const [table, setTable] = useState<Table | null>(null);
  const { tableId } = params;

  // 获取单个 table 的数据
  const fetchTable = async () => {
    try {
      console.log("Fetching table for ID:", tableId); // 调试信息
      const response = await fetch(`/api/getTable?tableId=${tableId}`);
      
      console.log(`/api/getTable?tableId=${tableId}`);

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Table:", data); // 检查 API 返回的数据
        setTable(data);
      } else {
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching table:", error);
    }
  };

  useEffect(() => {
    if (tableId) {
      fetchTable();
    }
  }, [tableId]);

  if (!table) {
    console.log("Loading table state:", table);
    return <div>Loading table...</div>;
  }

  return (
    <div>
      <h1>{table.name}</h1>
      <p>Table ID: {table.id}</p>
    </div>
  );
}
