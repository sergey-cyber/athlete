import { amenitiesService } from "@/service/amenities";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const amenities = await amenitiesService.search();

  return Response.json({ amenities });
}
