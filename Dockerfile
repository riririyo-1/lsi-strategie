# Node公式イメージを利用
FROM node:20-alpine

# 作業ディレクトリ作成
WORKDIR /app

# 依存関係インストールのため package.json, lockファイルのみ先にコピー
COPY package*.json ./

# 依存関係インストール
RUN npm install

# 全ソースをコピー
COPY . .

# Next.jsのビルドキャッシュを有効化
ENV NEXT_TELEMETRY_DISABLED=1

# 開発サーバー起動（本番は npm run build → npm run start）
CMD ["npm", "run", "dev"]