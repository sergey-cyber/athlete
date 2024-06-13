"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { StatusForm, StatusFormValues } from "./status-form";
import { useState } from "react";
import { createStatus } from "@/service/status/actions";
import { useToast } from "../ui/use-toast";

export function CreateStatusButton() {
  const { toast } = useToast();
  const [openForm, setOpenForm] = useState(false);
  const [values, setValues] = useState<StatusFormValues>({ status: "" });
  const [pending, setPending] = useState(false);

  const onSubmit = async () => {
    setPending(true);
    try {
      const res = await createStatus(values);
      if (res?.error) {
        toast({
          title: "Ошибка при создании статуса.",
          variant: "destructive",
          description: res.error.message,
        });
        return;
      }
      toast({
        title: "Статус создан успешно.",
      });
      setOpenForm(false);
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
      title="Создание статуса"
      onSubmit={onSubmit}
    >
      <Button onClick={() => setOpenForm(true)}>
        <Plus className="mr-2" />
        Добавить статус
      </Button>
    </StatusForm>
  );
}
