#!/bin/sh
set -Ceu

# 入力値
export INPUT_anypoint_connapp_client_id=aaa
export INPUT_anypoint_identity_provider_id=bbb
export INPUT_anypoint_user_name=ccc
export INPUT_anypoint_token_endpoint_url=http://localhost:1/oauth2/token
# MEMO `openssl genrsa 2048`のみだと、エラー「"pkcs8" must be PKCS#8 formatted string」が発生した。
#     そのため、「-----BEGIN RSA PRIVATE KEY-----」からPKCS8形式「-----BEGIN PRIVATE KEY-----」に変換する。
INPUT_private_key_pem=$(openssl genrsa 2048 | openssl pkcs8 -in - -topk8 -nocrypt)
export INPUT_private_key_pem
export INPUT_expiration_time=99h

# 実行
node ./index.js

# 出力値
# ※標準出力
