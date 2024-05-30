import { Button } from "@/components/ui/button";
import { useConfigStore } from "@/store/config-store";
import { Menu } from "lucide-react";

export const SidebarMenuButton = () => {
  const toggle = useConfigStore((state) => state.toggleMenu);

  return (
    <Button variant="secondary" size="icon" onClick={() => toggle()}>
      <Menu className="h-5 w-5" />
    </Button>
  );
};
