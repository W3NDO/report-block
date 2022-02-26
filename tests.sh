echo "Building and Deploying contract =================== "
printf "\n"
npm run build:contract && near dev-deploy out/main.wasm

dev_account=`cat ./neardev/dev-account`
random_id=`cat /proc/sys/kernel/random/uuid | sed 's/[-]//g' | head -c 20;`

printf "\n"
echo " Attempting to open account ======================= "
printf "\n"
near call ${dev_account} accountOpened '{"accountId": "random_id", "uid": "uid_1", "lenderId": "lender_id", "type": "card", "info": {"accountId" : "whatever"}, "payments": [], "dateOpened": "1645903639", "remarks": "string"}' --account-id wendo.testnet

printf "\n"
echo "Attempting to close an account. =================== "
printf "\n"
near call ${dev_account} accountClosed '{"accountId":"random_id", "date" : "1645903639"}' --account-id wendo.testnet

