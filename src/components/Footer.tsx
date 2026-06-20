import { Link } from "react-router";
import { CreditCard, Truck, ShieldCheck, Headphones } from "lucide-react";
import type { ReactNode } from "react";

// Fallback translations matching Header.tsx dictionary scheme
const TRANSLATIONS = {
  en: {
    brand: "Midad Store",
    tagline: "Your Ultimate Tech & Book Hub",
    nav_dashboard: "My Profile",
    nav_cart: "Cart",
    nav_signin: "Sign In",
  },
  ar: {
    brand: "متجر مِداد",
    tagline: "وجهتك المثالية للكتب والتقنية",
    nav_dashboard: "الملف الشخصي",
    nav_cart: "السلة",
    nav_signin: "تسجيل الدخول",
  },
};

interface FooterProps {
  lang?: "en" | "ar";
  t?: (key: string) => string;
}

export function Footer({ lang = "en", t }: FooterProps) {
  const isAr = lang === "ar";

  // Safe translation lookups
  const translate = (key: string): string => {
    if (typeof t === "function") return t(key);
    return (
      TRANSLATIONS[lang]?.[key as keyof (typeof TRANSLATIONS)["en"]] ?? key
    );
  };

  return (
    <footer className="mt-auto bg-secondary text-secondary-foreground border-t">
      {/* Top Marketing Value Banner Features */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-b">
        <Feature
          icon={<Truck className="h-5 w-5" />}
          title={isAr ? "توصيل سريع" : "Fast Delivery"}
          sub={isAr ? "لجميع مدن المملكة" : "All KSA cities"}
        />
        <Feature
          icon={<CreditCard className="h-5 w-5" />}
          title={isAr ? "ادفع لاحقًا" : "Buy Now, Pay Later"}
          sub={isAr ? "تابي وتمارا" : "Tabby & Tamara"}
        />
        <Feature
          icon={<ShieldCheck className="h-5 w-5" />}
          title={isAr ? "ضمان رسمي" : "Official Warranty"}
          sub={isAr ? "على جميع المنتجات" : "On every product"}
        />
        <Feature
          icon={<Headphones className="h-5 w-5" />}
          title={isAr ? "دعم ٢٤/٧" : "24/7 Support"}
          sub={isAr ? "بالعربية والإنجليزية" : "Arabic & English"}
        />
      </div>

      {/* Main Multi-Column Links Section */}
      <div className="container mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <h4 className="font-semibold mb-3">{translate("brand")}</h4>
          <p className="text-muted-foreground leading-relaxed">
            {translate("tagline")}
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">{isAr ? "تسوق" : "Shop"}</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link
                to="/category/smartphones"
                className="hover:text-foreground transition-colors"
              >
                {isAr ? "الهواتف الذكية" : "Smartphones"}
              </Link>
            </li>
            <li>
              <Link
                to="/category/laptops"
                className="hover:text-foreground transition-colors"
              >
                {isAr ? "الحاسبات المحمولة" : "Laptops"}
              </Link>
            </li>
            <li>
              <Link
                to="/category/gaming"
                className="hover:text-foreground transition-colors"
              >
                {isAr ? "الألعاب" : "Gaming"}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">
            {isAr ? "حسابي" : "My Account"}
          </h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link
                to="/dashboard"
                className="hover:text-foreground transition-colors"
              >
                {translate("nav_dashboard")}
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="hover:text-foreground transition-colors"
              >
                {translate("nav_cart")}
              </Link>
            </li>
            <li>
              <Link
                to="/auth"
                className="hover:text-foreground transition-colors"
              >
                {translate("nav_signin")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">
            {isAr ? "طرق الدفع" : "We Accept"}
          </h4>
          <div className="flex flex-wrap gap-2 text-xs">
            {["Mada", "Visa", "Mastercard", "Apple Pay", "Tabby", "Tamara"].map(
              (p) => (
                <span
                  key={p}
                  className="px-2 py-1 bg-background text-foreground rounded border font-medium select-none"
                >
                  {p}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Copyright Footer Sub-bar */}
      <div className="border-t py-4 text-center text-xs text-muted-foreground bg-black/[0.02]">
        © {new Date().getFullYear()} {translate("brand")} ·{" "}
        {isAr ? "جميع الحقوق محفوظة" : "All rights reserved"}
      </div>
    </footer>
  );
}

interface FeatureProps {
  icon: ReactNode;
  title: string;
  sub: string;
}

function Feature({ icon, title, sub }: FeatureProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
      </div>
    </div>
  );
}
