import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  // 只显示中文，不提供语言切换功能
  return (
    <Button size="sm" variant="outline">
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline">中文</span>
    </Button>
  );
}
