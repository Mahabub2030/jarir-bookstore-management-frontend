import { useState } from "react";
import { useNavigate, Link } from "react-router";
import {
  ShoppingCart,
  User,
  Search,
  LogOut,
  ShieldCheck,
  Languages,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

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

// Fallback Dictionary to prevent "t is not a function" errors
const TRANSLATIONS = {
  en: {
    brand: "Midad Store",
    tagline: "Your Ultimate Tech & Book Hub",
    search_placeholder: "Search for smartphones, laptops, books...",
    nav_dashboard: "My Profile",
    nav_admin: "Admin Control",
    nav_signout: "Sign Out",
    nav_signin: "Sign In",
    nav_cart: "Cart",
  },
  ar: {
    brand: "متجر مِداد",
    tagline: "وجهتك المثالية للكتب والتقنية",
    search_placeholder: "ابحث عن الهواتف، الحاسبات، الكتب...",
    nav_dashboard: "الملف الشخصي",
    nav_admin: "لوحة المسؤول",
    nav_signout: "تسجيل الخروج",
    nav_signin: "تسجيل الدخول",
    nav_cart: "السلة",
  },
};

interface HeaderProps {
  lang: "en" | "ar";
  setLang: (lang: "en" | "ar") => void;
  user: {
    email: string;
    full_name?: string;
    role: "customer" | "admin";
  } | null;
  logoutUser: () => Promise<void>;
  cartCount: number;
  t?: (key: string) => string; // Made optional with '?' to protect execution
}

export function Header({
  lang = "en",
  setLang,
  user,
  logoutUser,
  cartCount,
  t,
}: HeaderProps) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  // Safe runtime check: Use provided 't' function, or use our static TRANSLATIONS dictionary fallback
  const translate = (key: string): string => {
    if (typeof t === "function") return t(key);
    return (
      TRANSLATIONS[lang]?.[key as keyof (typeof TRANSLATIONS)["en"]] ?? key
    );
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (query) navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-primary text-primary-foreground shadow-sm">
      {/* Top Utility Bar */}
      <div className="border-b border-white/10 text-xs">
        <div className="container mx-auto flex items-center justify-between px-4 py-1.5">
          <span className="opacity-80">{translate("tagline")}</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <Languages className="h-3.5 w-3.5" />
              {lang === "en" ? "العربية" : "English"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Core Header */}
      <div className="container mx-auto flex items-center gap-4 px-4 py-3">
        <Link to="/" className="text-xl font-bold tracking-tight shrink-0">
          {translate("brand")}
        </Link>

        {/* Global Search Input Bar */}
        <form onSubmit={onSearch} className="hidden md:flex flex-1 max-w-2xl">
          <div className="flex w-full bg-background rounded-md overflow-hidden ring-1 ring-white/10">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={translate("search_placeholder")}
              className="border-0 text-foreground focus-visible:ring-0 rounded-none h-9"
            />
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="rounded-none text-foreground hover:bg-accent h-9 px-3 border-s"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>

        {/* Navigation Actions Controls */}
        <div className="ms-auto flex items-center gap-1">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-white/10 data-[state=open]:bg-white/10"
                >
                  <User className="h-4 w-4 me-1" />
                  <span className="hidden sm:inline">
                    {user.full_name ?? user.email.split("@")[0]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <User className="h-4 w-4 me-2" /> {translate("nav_dashboard")}
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    <ShieldCheck className="h-4 w-4 me-2" />{" "}
                    {translate("nav_admin")}
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    await logoutUser();
                    navigate("/");
                  }}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="h-4 w-4 me-2" /> {translate("nav_signout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-white/10"
            >
              <Link to="/auth">{translate("nav_signin")}</Link>
            </Button>
          )}

          {/* Cart Icon Component Button */}
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:bg-white/10 relative"
          >
            <Link to="/cart">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline ms-1">
                {translate("nav_cart")}
              </span>
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -end-1 h-5 min-w-5 px-1 flex items-center justify-center bg-destructive text-destructive-foreground font-bold text-[10px] rounded-full">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </Button>
        </div>
      </div>

      {/* Horizontal Scrollable Category Bar Navigation */}
      <nav className="border-t border-white/10 bg-primary/95">
        <div className="container mx-auto flex items-center gap-1 px-4 py-1 overflow-x-auto no-scrollbar">
          <Menu className="h-4 w-4 opacity-60 shrink-0 me-1" />
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/category/${c.slug}`}
              className="text-sm px-3 py-1.5 rounded hover:bg-white/10 whitespace-nowrap transition-colors"
            >
              {lang === "ar" ? c.ar : c.en}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
