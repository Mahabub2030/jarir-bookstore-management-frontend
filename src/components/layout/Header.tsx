import { ShoppingCart, Search, Languages, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useI18n } from "../I18n/I18Provider";
import { Link, useNavigate } from "react-router";

const CATEGORIES = [
  { slug: "smartphones", en: "Smartphones", ar: "الهواتف" },
  { slug: "laptops", en: "Laptops", ar: "حاسبات محمولة" },
  { slug: "gaming", en: "Gaming", ar: "الألعاب" },
  { slug: "audio", en: "Audio", ar: "الصوتيات" },
  { slug: "wearables", en: "Wearables", ar: "الساعات الذكية" },
  { slug: "books", en: "Books", ar: "الكتب" },
  { slug: "toys", en: "Toys", ar: "الألعاب" },
  { slug: "stationery", en: "Stationery", ar: "القرطاسية" },
];

export function Header() {
  const { t, lang, setLang } = useI18n();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      // Adjusted syntax to use clean URL queries standard for React Router
      navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-primary text-primary-foreground shadow-sm">
      {/* Top Banner */}
      <div className="border-b border-white/10 text-xs">
        <div className="container mx-auto flex items-center justify-between px-4 py-1.5">
          <span className="opacity-80">{t("tagline")}</span>
          <div className="flex items-center gap-3 ">
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="flex items-center gap-1 hover:opacity-80 cursor-pointer "
            >
              <Languages className="h-3.5 w-3.5" />
              {lang === "en" ? "العربية" : "English"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="container mx-auto flex items-center gap-4 px-4 py-3">
        <Link to="/" className="text-xl font-bold tracking-tight shrink-0">
          {t("brand")}
        </Link>

        {/* Search Bar */}
        <form onSubmit={onSearch} className="hidden md:flex flex-1 max-w-2xl">
          <div className="flex w-full bg-background rounded-md overflow-hidden ring-1 ring-white/10">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("search_placeholder")}
              className="border-0 text-foreground focus-visible:ring-0 rounded-none"
            />
            <Button
              type="submit"
              variant="ghost"
              className="rounded-none text-foreground hover:bg-accent"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>

        {/* Navigation Action Buttons */}
        <div className="ms-auto flex items-center gap-1">
          {/* User sign-in display (Simplified to default sign-in button for now) */}
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:bg-white/10"
          >
            <Link to="/auth">{t("nav_signin")}</Link>
          </Button>

          {/* Cart button */}
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:bg-white/10 relative"
          >
            <Link to="/cart">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline ms-1">{t("nav_cart")}</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Category Submenu */}
      <nav className="border-t border-white/10 bg-primary/95">
        <div className="container mx-auto flex items-center gap-1 px-4 py-1 overflow-x-auto">
          <Menu className="h-4 w-4 opacity-60 shrink-0" />
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/category/${c.slug}`}
              className="text-sm px-3 py-1.5 rounded hover:bg-white/10 whitespace-nowrap"
            >
              {lang === "ar" ? c.ar : c.en}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
