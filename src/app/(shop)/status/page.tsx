import { Empty } from "@/components/empty";
import { CreateStatusButton } from "@/components/status/create-status-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { statusService } from "@/service/status";

export default async function StatusesPage() {
  const statuses = await statusService.search();

  return (
    <section>
      <div className="py-6 flex justify-between">
        <h1 className="text-2xl font-bold">Статусы</h1>
        <CreateStatusButton />
      </div>

      {statuses.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Идентификатор</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {statuses.map((status) => (
              <TableRow key={status.id}>
                <TableCell className="font-medium">{status.id}</TableCell>
                <TableCell>{status.status}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Empty className="mt-4" />
      )}
    </section>
  );
}
