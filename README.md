# 認証機能付きTodoアプリ

Turborepo、React + Vite、Hono.jsを使用して構築されたフルスタックTodoアプリケーションです。

## 構成

このTurborepoモノレポには以下が含まれています：

### アプリケーション

- `frontend`: TodoアプリのUIを提供するReact + Vite SPA
- `backend`: 認証機能を備えたHono.js REST APIサーバー

### 技術スタック

- **フロントエンド**: React, TypeScript, Vite
- **バックエンド**: Hono.js, TypeScript
- **ビルドシステム**: Turborepo
- **パッケージマネージャー**: pnpm

### アーキテクチャ

#### バックエンド

バックエンドはレイヤードアーキテクチャ（Clean Architecture）を採用し、以下の層で構成されています：

- **Domain層**: ビジネスロジックとエンティティを定義
  - エンティティ（Todo、User）
  - リポジトリインターフェース
  - ビジネスルール

- **Application層**: ユースケースとアプリケーションサービス
  - ユースケース（CreateTodo、UpdateTodo等）
  - DTOの定義

- **Infrastructure層**: 外部システムとの連携
  - リポジトリの実装
  - データベース接続
  - 外部API連携

- **Presentation層**: HTTPリクエスト/レスポンスの処理
  - ルーティング
  - コントローラー
  - ミドルウェア（認証、エラーハンドリング等）

### 開発手法

- **TDD（テスト駆動開発）**: すべての機能実装はテストファーストで進めます
  - 単体テスト: 各層のビジネスロジックをテスト
  - 統合テスト: API エンドポイントのテスト
  - E2Eテスト: フロントエンドとバックエンドの連携テスト

## はじめに

### 前提条件

- Node.js >= 18
- pnpm

### インストール

```sh
pnpm install
```

### 開発

すべてのアプリを開発モードで起動：

```sh
pnpm dev
```

以下のURLでアクセス可能：
- フロントエンド: http://localhost:5173
- バックエンド: http://localhost:3000

### ビルド

すべてのアプリをビルド：

```sh
pnpm build
```

### その他のコマンド

- `pnpm lint` - すべてのアプリでESLintを実行
- `pnpm check-types` - TypeScriptの型チェックを実行
- `pnpm format` - Prettierでコードをフォーマット
- `pnpm test` - テストを実行
- `pnpm clean` - ビルド出力とキャッシュをクリーン

## 機能（予定）

- ユーザー認証（登録、ログイン、ログアウト）
- Todoの作成、読み取り、更新、削除（CRUD）
- Todoの完了/未完了の切り替え
- ステータスによるTodoのフィルタリング
- レスポンシブデザイン
