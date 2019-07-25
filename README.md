DreamHouse Web アプリ
------------------
このサンプリアプリは、Heroku上で実行され、オプションでHeroku Connectを使用して Salesforceからデータを取得する
[DreamHouse](http://www.dreamhouseappjp.io/) に対応したモバイルWebアプリです。デモをご覧ください。

[![Demo](http://img.youtube.com/vi/sSoUGkqveMo/0.jpg)](http://www.youtube.com/watch?v=sSoUGkqveMo)

このアプリは ionic と Node.js で開発されており、ローカルでも Heroku でもカンタンに実行できます。

ローカルで実行する場合:

1. [Postgres をインストールして開始します](https://lets.postgresql.jp/map/install)
1. [Node.js をインストールします](https://nodejs.org/ja/)
1. Postgres でデータベースを作成し、`dreamhouse` という名前をつけます
1. NPM 依存関係をフェッチします。`npm install`
1. アプリを起動します `npm run dev`
1. アプリを確認します [http://localhost:8200/](http://localhost:8200/)

Heroku で実行する場合:

1. [![Deploy on Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/dreamhouseapp/dreamhouse-web-app)
1. アプリを確認します `http://<YOUR APP NAME>.herokuapp.com`

Heroku Connect を使う場合:

1. [Salesforce Developer Edition 組織にサインアップします](https://developer.salesforce.com/signup)
1. [Dreamhouse パッケーを組織へインストールします](http://www.dreamhouseappjp.io/installation/)
1. [Heroku Connect アドオンを Heroku アプリに追加します](https://elements.heroku.com/addons/herokuconnect)
1. Heroku Connect をセットアップします。Heroku アプリの管理ダッシュボードの［Resources］タブの［*Heroku Connect*］をクリックします `https://dashboard.heroku.com/apps/YOUR_APP_NAME/resources`
1. `Property__c` を読み込み専用でマッピングへ追加します。マッピング対象のフィールドは次の通り: `address__c, baths__c, beds__c, broker__c, city__c, description__c, location__latitude__s, location__longitude__s, picture__c, price__c, state__c, tags__c, thumbnail__c, title__c`
1. `Broker__c` も同様に読み込み専用で、次のフィールドとともにマッピングを追加します: `email__c, mobile_phone__c, phone__c, picture__c, title__c`
2. `Property_Favorite__c` オブジェクトに、項目を一つ追加します。Salesforceの「設定」画面からオブジェクトマネージャを開きます。その中から`Property Favorite`ひ開きます。「項目とリレーション」から「新規」で次の通りフィールドを作ります。
   1. `データ型` : テキスト - 36文字
   2. `項目の表示ラベル` : Id
   3. `項目名` : Id
   4. `ユニーク` : 値の重複を許可しない - 「ABC」と「abc」を値の重複として扱う(大文字と小文字を区別しない)
   5. `外部ID` : 外部システムの一位のレコード識別子として設定する
3. `id__c` を外部IDとして設定して、`Property_Favorite__c` を双方向の設定でマッピングします。対象のフィールドは次の通り: `Property__c, User__c, Id__c`
5. 新しいデータベーステーブルが使用されるように、アプリを再起動します
6. アプリを確認し、Salesforce で物件の価格を変更したときに同期が機能するかどうかを検証します
