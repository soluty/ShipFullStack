import { useNavigate, useParams } from "@tanstack/react-router";
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

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
] as const;

// Regex for removing locale prefix from path
const LOCALE_PREFIX_REGEX = /^\/(en|zh|es|fr|de|ja|ko)(\/|$)/;

export default function LanguageSwitcher() {
  const params = useParams({ strict: false });
  const navigate = useNavigate();

  // Get current locale from params or default to 'en'
  const currentLocale = (params as { locale?: string }).locale || "en";
  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === currentLocale) || LANGUAGES[0];

  const handleLanguageChange = (langCode: string) => {
    // Get current pathname
    const currentPath = window.location.pathname;

    // Remove existing locale prefix if present
    const pathWithoutLocale = currentPath.replace(LOCALE_PREFIX_REGEX, "/");

    // Navigate to new locale path
    const newPath =
      langCode === "en"
        ? pathWithoutLocale || "/"
        : `/${langCode}${pathWithoutLocale || "/"}`;

    navigate({ to: newPath });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Switch language" size="sm" variant="outline">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {currentLanguage.flag} {currentLanguage.name}
          </span>
          <span className="sm:inline md:hidden">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Select Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="flex-1">{lang.name}</span>
            {lang.code === currentLocale && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
