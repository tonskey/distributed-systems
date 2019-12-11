1. Build image ```docker build -t app .```
1. Generate data ``` node app/data-generator/index.js```
1. Run container ```./run.sh```
1. Run the folowing commands inside the container
    1. Go to the working directory```cd app/data-generator```
    1. Run spark shell ```/opt/spark/bin/spark-shell```
    1. Type the code from the file ```scala-commands``` one by one
