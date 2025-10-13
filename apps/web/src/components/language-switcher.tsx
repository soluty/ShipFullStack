import { Check, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { webConfig } from "@/configs/web-config";
import { m } from "@/paraglide/messages";
import { getLocale, setLocale } from "@/paraglide/runtime";

const { i18n } = webConfig;

export default function LanguageSwitcher() {
  const locales = i18n.locales;

  if (!Object.keys(locales).length) {
    return null;
  }

  const currentLanguage = getLocale();

  const handleLanguageChange = (langCode: "en" | "zh") => {
    setLocale(langCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {locales[currentLanguage].name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>{m["language.switcher"]()}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.entries(locales).map(([key, value]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => handleLanguageChange(key as "en" | "zh")}
          >
            <span className="mr-1">{value.flag}</span>
            <span>{value.name}</span>
            {key === currentLanguage && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
