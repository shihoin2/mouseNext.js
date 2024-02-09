# Vision Board作成アプリ「WEAVE」
内定直結型エンジニア学習プログラム「APPRENTICE」のチーム開発で作成したWebアプリケーションです。
![weave_logo](https://github.com/shihoin2/mouseNext.js/assets/135839594/19ddcdfb-f8d4-4e3c-94a6-e10e979164f8)

本アプリは、ワクワクする未来を形にしたい方向けのプロダクトです。
自分の理想の未来を、写真と文章で視覚化することで、モチベーションを高めるなど、理想に近づく助けになります。

# 環境構築
## イメージのクローン
フロントエンドのリポジトリ
```
https://github.com/shihoin2/mouseNext.js.git
```
バックエンドのリポジトリ
```
https://github.com/shihoin2/mouse.git
```
## バックエンド
### Dockerfile の親ディレクトリ(mouse)へ移動
```
cd mouse
```
### Docker を起動し、コンテナを作成
```
sail up -d
```
### 依存関係をインストール・更新
```
sail comopser install
sail composer update
```
### サーバーを起動する
```
sail artisan serve
```
## フロントエンド
### ライブラリ依存関係のインストール
```
npm install
npm update
```
### サーバー起動
```
npm run dev
```

# WEAVEの使い方
## 1. サーバーを起動し、左記 URL でアクセス：[http://localhost:8000/]
ページを開くと、Vision boardのテンプレート一覧が表示されます。
お好きなテンプレートを選んで、クリックしてください。
※注意：今はテンプレートが1つしか実装していません。
## 2. チュートリアルが表示されるので、初めて作成する方は、参考してください。
![Untitled](https://github.com/shihoin2/mouseNext.js/assets/135839594/d209ea39-b93e-4642-ba55-19d5f8abd56c)
## 3. 黄色のボックスには、目標を文章で入力することができます。内容は自動的に保存されます。
## 4. 灰色のボックスには写真を登録できます。手元の好きな画像を登録してください。
![template1 png](https://github.com/shihoin2/mouseNext.js/assets/135839594/8645e7dd-d1d1-4896-bc10-59885c0519f8)
## 5. 右上のクエスチョンマークをクリックすると、ヘルプ画面がでてきます。作成時に何を書くか迷ったときにご使用ください。
![Untitled (1)](https://github.com/shihoin2/mouseNext.js/assets/135839594/1616c03b-6322-4b4c-8026-6f94977219f2)
## 6. Previewボタンを押すと、作成したVision boardの一覧が表示されます。作成したVision boardは画像としてダウンロード可能です。
# 完成例
<img width="1160" alt="demo_tumbnail" src="https://github.com/shihoin2/mouseNext.js/assets/135839594/60ebddda-eaa0-41f4-acc1-9f0b9498fdce">
