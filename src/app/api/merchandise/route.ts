import { merchandiseService } from "@/service/merchandise";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const merchandises = await merchandiseService.search();

  return Response.json({ merchandises });
}
