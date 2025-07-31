#!/bin/sh
set -Ceu

# 入力値
export INPUT_anypoint_connapp_client_id=1c27faeb7ed74b929c7e6bb715b0035f
export INPUT_anypoint_identity_provider_id=mulesoft
export INPUT_anypoint_user_name=dec21064-2506
export INPUT_anypoint_token_endpoint_url=https://anypoint.mulesoft.com/accounts/api/v2/oauth2/token
export INPUT_private_key_pem="$INPUT_private_key_pem"
export INPUT_expiration_time=3m

# 実行
node ./index.js

# 出力値
# ※標準出力
