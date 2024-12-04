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
      const response = await fetch(`/api/getTable?tableId=${tableId}`);
      if (response.ok) {
        const data = await response.json();
        setTable(data);
      }
    } catch (error) {
      console.error("Error fetching table:", error);
    }
  };

  useEffect(() => {
    fetchTable();
  }, []);

  if (!table) return <div>Loading...</div>;

  return (
    <div>
      <h1>{table.name}</h1>
      <p>Table ID: {table.id}</p>
    </div>
  );
}
