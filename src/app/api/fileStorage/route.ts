import { fileStorageService } from "@/service/fileStorage";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  try {
    const res = await fileStorageService.downloadFile(id!);
    return res;
  } catch (err) {
    throw err;
  }
}
