import { NextResponse } from "next/server";
import { createBase } from "~/server/db"; // 调用封装的 createBase 函数

export async function POST(req: Request) {
  try {
    const { name } = await req.json(); // 从请求体中获取 name
    const newBase = await createBase(name); // 调用封装的逻辑创建 Base
    return NextResponse.json(newBase); // 返回创建的 Base
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create base" }, { status: 500 });
  }
}
