FROM openjdk:latest
COPY compile.sh /

RUN curl -O http://apache.ip-connect.vn.ua/hadoop/common/hadoop-3.2.1/hadoop-3.2.1.tar.gz
RUN curl -O https://repo1.maven.org/maven2/org/apache/hadoop/hadoop-core/1.2.1/hadoop-core-1.2.1.jar 
RUN tar -xzvf hadoop-3.2.1.tar.gz
RUN mv hadoop-3.2.1 /usr/local/hadoop
RUN rm -rf hadoop-3.2.1 hadoop-3.2.1.tar.gz 