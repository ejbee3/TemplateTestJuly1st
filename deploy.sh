dotnet publish -c Release 

cp dockerfile ./bin/release/netcoreapp2.2/publish

docker build -t sdg-attendance-tracker-image ./bin/release/netcoreapp2.2/publish

docker tag sdg-attendance-tracker-image registry.heroku.com/sdg-attendance-tracker/web

docker push registry.heroku.com/sdg-attendance-tracker/web

heroku container:release web -a sdg-attendance-tracker

# sudo chmod 755 deploy.sh
# ./deploy.sh