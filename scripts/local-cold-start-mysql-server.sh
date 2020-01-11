docker run -p 3307:3306 -p 33060:33060 --name=mysql-server-instance -d mysql/mysql-server
echo ""
echo "Booting up mysql server..."
sleep 30
docker exec -it mysql-server-instance mysql -u root -p$(docker logs mysql-server-instance 2>&1 | grep GENERATED | sed -n 's/.*PASSWORD: //p')
