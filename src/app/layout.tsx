import {cn} from "@/lib/cn";
import {geistMono, geistSans} from "@/lib/fonts";

export default function RootLayout({children}: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased", [
          geistMono.className,
          geistSans.className,
        ])}>
        {children}
      </body>
    </html>
  );
}
