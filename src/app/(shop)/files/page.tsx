import { fileStorageService } from "@/service/fileStorage";
import { Empty } from "@/components/empty";
import { FileJson } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { UploadFileModal } from "@/components/files/upload-file-modal";

export default async function FilesPage() {
  const files = await fileStorageService.search();

  return (
    <section className="space-y-6">
      <div className="py-6 flex justify-between">
        <h1 className="text-2xl font-bold">Файлы</h1>
        <UploadFileModal />
      </div>
      {files.length ? (
        <div className="grid grid-cols-4 gap-4 lg:grid-cols-5 xl:grid-cols-6">
          {files.map((file) => (
            <Card>
              <CardContent className="py-4 flex flex-col gap-y-2 items-center">
                <FileJson strokeWidth={1} size={48} className="h-12" />
                {file.title}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </section>
  );
}
