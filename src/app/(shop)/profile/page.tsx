import { ProfileForm } from "@/components/profile/profile-form";
import { SignUpForm } from "@/components/sign-up/sign-up-form";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { UserAvatar } from "@/components/users/user-avatar";
import { defineColorForRole, getFullName } from "@/lib/utils";
import { authService } from "@/service/auth";

export default async function ProfilePage() {
  const principal = await authService.getPrincipal();

  return (
    <section className="flex flex-row gap-x-6 mt-6">
      <Card className="basis-1/3 flex flex-col items-center">
        <CardTitle className="my-6">
          <UserAvatar className="w-24 h-24" userName={principal.firstName} />
        </CardTitle>
        <CardContent className="text-center space-y-2">
          <p className="font-semibold text-lg">{getFullName(principal)}</p>
          <Badge className={defineColorForRole(principal.role)}>
            {principal.role.toUpperCase()}
          </Badge>
          <CardDescription>{principal.address}</CardDescription>
        </CardContent>
      </Card>
      <Card className="basis-2/3">
        <CardContent>
          <ProfileForm initialValues={principal} className="w-full" />
        </CardContent>
      </Card>
    </section>
  );
}
