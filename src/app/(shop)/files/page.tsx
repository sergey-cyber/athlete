import { fileStorageService } from "@/service/fileStorage";
import { Empty } from "@/components/empty";
import { FileJson } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { UploadFileModal } from "@/components/files/upload-file-modal";
import { DownloadFileButton } from "@/components/files/download-file-button";
import { DeleteFileButton } from "@/components/files/delete-file-button";
import { getHttpStatusMessage } from "@/lib/utils";

export default async function FilesPage() {
  let files = [];

  try {
    files = await fileStorageService.findAllWithoutOrder();
  } catch (err: any) {
    return (
      <div className="w-full text-center mt-4">
        <p className="text-lg font-semibold">Ошибка!</p>
        <p>{getHttpStatusMessage(err?.status)}</p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="py-6 flex justify-between">
        <h1 className="text-2xl font-bold">Файлы</h1>
        <UploadFileModal />
      </div>
      {files.length ? (
        <div className="grid grid-cols-4 gap-4 lg:grid-cols-5 xl:grid-cols-6">
          {files.map((file) => (
            <Card key={file.id}>
              <CardContent className="p-3 flex flex-col gap-y-2 items-center">
                <div className="w-full flex justify-end gap-x-2">
                  <DownloadFileButton file={file} />
                  <DeleteFileButton file={file} />
                </div>
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
