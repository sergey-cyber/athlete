"use client";

import { StatusType } from "@/service/status/types";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { editStatus } from "@/service/status/actions";
import { StatusForm, StatusFormValues } from "./status-form";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";

interface Props {
  status: StatusType;
}

export function EditStatusButton({ status }: Props) {
  const { toast } = useToast();
  const [openForm, setOpenForm] = useState(false);
  const [values, setValues] = useState<StatusFormValues>(status);
  const [pending, setPending] = useState(false);

  const onSubmit = async () => {
    setPending(true);
    try {
      await editStatus({ ...values, id: status.id });
      toast({
        title: "Статус изменен успешно.",
      });
      setOpenForm(false);
    } catch (err: any) {
      toast({
        title: "Ошибка при изменении статуса.",
        variant: "destructive",
        description: err.message ?? "",
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <StatusForm
      values={values}
      loading={pending}
      onChange={(field, value) => setValues({ ...values, [field]: value })}
      open={openForm}
      onClose={() => setOpenForm(false)}
      title="Редактирование статуса"
      onSubmit={onSubmit}
    >
      <Button
        onClick={() => setOpenForm(true)}
        variant={"outline"}
        size={"mini"}
      >
        <Pencil size={16} />
      </Button>
    </StatusForm>
  );
}
