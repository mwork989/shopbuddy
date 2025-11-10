
import ClientProviders from "@/components/ClientProviders";
import { LOCALES, messages } from "@/lib/i18n";

export const metadata = {
  title: "ShopBuddy",
  description: "Training Capstone",
};

export default  async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!LOCALES.includes(locale)) return null;
  return (
    <html lang={locale}>
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <ClientProviders>
          <header className="p-4 flex gap-4 items-center justify-between border-b bg-white">
            <a href={`/${locale}`} className="font-bold">
              {messages[locale].title}
            </a>
            <nav className="flex gap-3 text-sm">
              <a href={`/${locale}/cart`}>Cart</a>
              <a href={`/${locale}/login`}>{messages[locale].login}</a>
              <a href={`/${locale}/dashboard`}>{messages[locale].dashboard}</a>
            </nav>
          </header>
          <main className="p-6 container mx-auto">{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}
