import { OrderType } from "@/service/order/types";
import { PropsWithChildren, ReactNode, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  File,
  HandPlatter,
  Megaphone,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { Price } from "./price";
import { MerchandiseList } from "./merchandise-list";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { StatusType } from "@/service/status/types";
import { UserType } from "@/service/user/types";
import { Textarea } from "../ui/textarea";
import { AmenitiesList } from "./amenities-list";
import { RequiredLabel } from "../required-label";
import { FileStorageType } from "@/service/fileStorage/types";
import { UserInfo } from "../users/user-info";
import { getFullName } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type FormValues = Partial<OrderType>;

interface Props extends PropsWithChildren {
  values: FormValues;
  onChange: <K extends keyof OrderType>(key: K, value: OrderType[K]) => void;
  statuses: StatusType[];
  clients: UserType[];
  onFileChange: (file: File | undefined) => void;
  currentFile?: FileStorageType;
}

export function OrderForm({
  children,
  values,
  statuses,
  clients,
  onChange,
  onFileChange,
  currentFile,
}: Props) {
  const { merchandises = [], amenities = [] } = values;
  function getTotalPrice() {
    return [...merchandises, ...amenities].reduce(
      (acc, { price }) => acc + price,
      0
    );
  }

  const [isFileChanged, setIsFileChanged] = useState(false);

  // Ограничение количества выбираемых элементов, так как бэк не поддерживает paging
  const selectableClients = clients.slice(0, 50);
  const selectableStatuses = statuses.slice(0, 50);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <Title title="Параметры" icon={<Settings />} />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <RequiredLabel>Название заявки</RequiredLabel>
            <Input
              onChange={(e) => onChange("orderName", e.currentTarget.value)}
              value={values.orderName}
            />
          </div>
          <div>
            <Label>Описание</Label>
            <Textarea
              onChange={(e) => onChange("description", e.currentTarget.value)}
              value={values.description}
            />
          </div>
          <div>
            <RequiredLabel>Статус</RequiredLabel>
            <Select
              onValueChange={(v) =>
                onChange(
                  "status",
                  selectableStatuses.find(({ id }) => id === Number(v))!
                )
              }
              value={values.status?.id.toString()}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {selectableStatuses.map((status) => (
                    <SelectItem key={status.id} value={status.id.toString()}>
                      {status.status}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Приоритет</Label>
            <Input
              onChange={(e) =>
                onChange("priority", Number(e.currentTarget.value))
              }
              type="number"
              value={values.priority || ""}
            />
          </div>
          <div>
            <RequiredLabel>Клиент</RequiredLabel>
            <Select
              onValueChange={(v) =>
                onChange(
                  "client",
                  selectableClients.find(({ id }) => id === Number(v))!
                )
              }
              value={values.client?.id.toString()}
            >
              <SelectTrigger>
                <SelectValue>
                  {values.client ? getFullName(values.client) : ""}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {selectableClients.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      <UserInfo user={user} />
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">Файл</Label>
            {currentFile && !isFileChanged ? (
              <div className="flex gap-x-2 ">
                <File /> <span>{currentFile.title}</span>
              </div>
            ) : null}
            <Input
              onChange={(e) => {
                onFileChange(e.target.files?.[0]);
                setIsFileChanged(true);
              }}
              id="file"
              type="file"
            />
          </div>
          <div>
            <Label>Комментарий</Label>
            <Textarea
              onChange={(e) => onChange("comments", e.currentTarget.value)}
              value={values.comments}
            />
          </div>
        </CardContent>
      </Card>
      <MerchandiseList
        title={<Title title="Товары" icon={<ShoppingBag />} />}
        merchandises={merchandises}
        onChange={(value) => onChange("merchandises", value)}
      />
      <AmenitiesList
        title={<Title title="Услуги" icon={<HandPlatter />} />}
        amenities={amenities}
        onChange={(value) => onChange("amenities", value)}
      />
      <Alert className="border-lime-500 bg-lime-50 dark:bg-inherit">
        <Megaphone className="h-4 w-4" />
        <AlertTitle>Обратите внимание!</AlertTitle>
        <AlertDescription>
          Если вы выберите в сумме больше пяти товаров и услуг, то мы сделаем
          скидку 20% от общей стоимости.
        </AlertDescription>
      </Alert>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex gap-x-3 items-center">
              <span>Итого к оплате:</span> <Price price={getTotalPrice()} />
            </div>
            {/* Submit button placement*/}
            {children}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}

function Title(props: { title: string; icon: ReactNode }) {
  return (
    <div className="flex gap-x-2">
      {props.icon}
      <span>{props.title}</span>
    </div>
  );
}
