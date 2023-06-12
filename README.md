
## Guide to run the Project with Docker



## 1- Download and Install Docker  :
  To begin running your project with Docker, you'll need to download and install Docker on your local device
## 2- Clone the project  :
```sh
git clone  https://github.com/abdelatif2000/news_aggregator.git
```
## 3-Navigate to the project  :
```sh
cd news_aggregator
```
## 4- Build the project   :
This step it will take some times , Wait for the Process to Complete
```sh
docker-compose up
```  
## 5- Navigate through inside the laravel conatainer :
Note: If the Laravel container name is not 'backend-1', you can open Docker and retrieve the ID or name of the backend container.
```sh
docker exec -it backend-1 bash 
```  
## 6- Migrate database tables :
```sh
php artisan migrate
```
## 6- Now the project is ready to go :
 Open the browser and then type :
```sh
localhost:3000
```

