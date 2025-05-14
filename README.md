
# UI サンプル

---

## ■ 概要

モダンな開発手法を取り入れてUIを用意するために立ち上げた。  

#### ❑ テーマ
ダーク/ライトテーマの選択。
next-themes ライブラリを試した。

#### ❑ 国際化（i18n）
言語の選択などに対応。
jsonを呼ぶ方式を試した。規模が大きくなる場合はライブラリの導入が良いらしい。

---

## ■ 技術スタック

#### ❑ 導入済み

- Next.js       (Reactフレームワーク)
- TypeScript    (JavaScriptのスーパーセット)
- Tailwind CSS  (ユーティリティファーストCSSフレームワーク)
- shadcn/ui     (Radix UIベースのUIコンポーネントライブラリ)
- framer-motion (Reactアニメーションライブラリ)
- next-themes   (Next.js用のテーマ切り替えライブラリ)

#### ❑ 導入予定

- next-intl     (国際化)
- MUI DataGrid  (表やカードのデザイン向け)

---

## ■ プレビュー画面

#### ❑ ライトモード/日本語

<img src='.\images\image250507_211934.png' alt='image' style="width: 600px; border: 1px solid black;">

#### ❑ ダークモード/英語
<img src='.\images\image250507_211954.png' alt='image' style="width: 600px; border: 1px solid black;">

---

## ■ 環境セットアップ

#### ❑ プロジェクトのクローン
```
git clone <リポジトリのURL>  
cd <プロジェクトディレクトリ名>  
```

#### ❑ Node.jsとnpmの確認
```
node -v  
npm -v  
```

#### ❑ 依存関係をインストール
```
npm install  
```

#### ❑ 環境変数の設定 (もしあれば)
```
.envファイルを作成  
```

#### ❑ 開発サーバーを起動
```
npm run dev  
nohup npm run dev ：バックグラウンド実行  

ブラウザで http://localhost:3000 を開く  
```

---

## ■ ディレクトリ構成

```
ui-sample/
├── src/
│   ├── app/                # Next.js App Router のルートディレクトリ (ページ、レイアウトなど)
│   │   ├── preview/        # 今回作成したプレビュー画面のディレクトリ
│   │   │   └── page.tsx    # プレビュー画面のコンポーネント
│   │   └── ...
│   ├── components/         # 再利用可能な UI コンポーネント
│   │   ├── ui/             # shadcn/ui のコンポーネント (button, input など)
│   │   └── ...
│   ├── lib/                # ユーティリティ関数など
│   ├── styles/             # グローバル CSS や Tailwind CSS の設定
│   │   └── globals.css
│   └── ...
├── public/                 # 静的ファイル (画像など)
├── .env                    # ローカル環境の環境変数
├── package.json            # プロジェクトの依存関係やスクリプト
├── README.md               # このファイル
├── tailwind.config.js      # Tailwind CSS の設定ファイル
├── postcss.config.js       # PostCSS の設定ファイル
└── ...
```

---

