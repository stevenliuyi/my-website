#!/bin/bash

# build
REACT_APP_IPFS=true PUBLIC_URL=. yarn build

# run ipfs node
IPFS_REPO_PATH=${IPFS_PATH:="$HOME/.ipfs"}
ipfs init
ipfs repo fsck
screen -dm ipfs daemon
sleep 180

# copy key
cp ipfs/key $IPFS_REPO_PATH/keystore/yliu

# previous hash
IPNS='QmZ6pqHr35ppWXAF6v72PG8Q3rWuDH6jVw4AZALcwA2rUZ'
CURR_HASH=$(ipfs resolve "/ipns/$IPNS")
CURR_HASH=${CURR_HASH:6}
echo 'Current hash:' $CURR_HASH

# new hash
NEW_HASH=$(ipfs add -r build | tail -1)
NEW_HASH=${NEW_HASH:6:46}
echo 'New hash:' $NEW_HASH

# pin build files to Pinata
echo 'Pinning build files to Pinata...'
PINATA_API_KEY='722d183c1d9531d77129'
curl -H "Content-Type: application/json" -H "pinata_api_key:$PINATA_API_KEY" -H "pinata_secret_api_key:$PINATA_SECRET_API_KEY" -d '{"hashToPin":"'$NEW_HASH'"}' https://api.pinata.cloud/pinning/addHashToPinQueue

curl -i "https://gateway.pinata.cloud/ipfs/$NEW_HASH"
sleep 180

# publish
echo 'Publishing to IPNS...'
ipfs name publish --key=yliu "$NEW_HASH"

# remove previous pin
curl -H "Content-Type: application/json" -H "pinata_api_key:$PINATA_API_KEY" -H "pinata_secret_api_key:$PINATA_SECRET_API_KEY" -d '{"ipfs_pin_hash":"'$CURR_HASH'"}' https://api.pinata.cloud/pinning/removePinFromIPFS
