 import { Button } from "@/components/ui/button"
import { useAppStore } from "@/app/store/appStore";

export function ButtonShadcn() {
  const { setIsOpen } = useAppStore();

  
  return(
  <div className="flex justify-end">
    <Button variant="secondary">Ajouter
    </Button>
  </div>)
}
