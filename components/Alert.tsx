import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/app/store/appStore"

export function AlertActionExample() {
    const isOpen = useAppStore((state) => state.isOpen);
    const setIsOpen = useAppStore((state) => state.setIsOpen);

  if (!isOpen) return null;

  return (
    <Alert className="max-w-md bg-[#fffaf7] flex flex-col gap-2">
      <AlertTitle>Le mode sombre est disponible</AlertTitle>
      <AlertDescription>
        Activez-le dans les paramètres de votre profil pour commencer à l'utiliser.
      </AlertDescription>
      <div className="mt-2">
        <Button size="sm" variant="default">
          Activer
        </Button>
      </div>
    </Alert>
    );
}
