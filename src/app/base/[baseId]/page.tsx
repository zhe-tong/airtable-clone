import { db } from "~/server/db";
import { bases } from "~/server/db/schema";
import { eq } from "drizzle-orm";

interface BasePageProps {
  params: { id: string };
}

export default async function BasePage({ params }: BasePageProps) {
  const { id } = params;

  // 查询数据库获取与 id 对应的 base 数据
  const base = await db
    .select()
    .from(bases)
    .where(eq(bases.id, id)) // 确保使用 eq 方法
    .execute();

  if (base.length === 0) {
    return <div>Base not found</div>;
  }

  return (
    <div>
      <h1>{base[0]?.name}</h1>
      <p>Base ID: {base[0]?.id}</p>
    </div>
  );
}
