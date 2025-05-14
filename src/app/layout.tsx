// next-themesを使用して、テーマの切り替えを行うためのレイアウトコンポーネント。
// attribute="class" は、テーマをCSSクラスで切り替える設定。

import { ThemeProvider } from 'next-themes';
import './globals.css';   // グローバルCSSファイルがあれば

export const metadata = {
  title: 'LSI Strategy Committee',
  description: '半導体戦略コミッティの管理ページです。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}