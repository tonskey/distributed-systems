FROM ubuntu:latest

RUN apt update && apt install openjdk-8-jdk scala gnupg2 curl -y \
    && echo "deb https://dl.bintray.com/sbt/debian /" | tee -a /etc/apt/sources.list.d/sbt.list \
    && curl -sL "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x2EE0EA64E40A89B84B2DF73499E82A75642AC823" | apt-key add \
    && apt update \
    && apt install sbt -y  \
    && curl -O http://apache.cp.if.ua/spark/spark-3.0.0-preview/spark-3.0.0-preview-bin-hadoop2.7.tgz \
    && tar xvf spark-3.0.0-preview-bin-hadoop2.7.tgz \
    && mv spark-3.0.0-preview-bin-hadoop2.7 /opt/spark \
    && rm -rf spark-3.0.0-preview-bin-hadoop2.7 spark-3.0.0-preview-bin-hadoop2.7.tgz \
    && echo 'export SPARK_HOME=/opt/spark' >> ~/.bashrc \
    && echo 'export PATH=$PATH:$SPARK_HOME/bin:$SPARK_HOME/sbin' >> ~/.bashrc \
    && curl -O http://apache.cp.if.ua/hadoop/common/hadoop-2.10.0/hadoop-2.10.0.tar.gz \
    && tar xvf hadoop-2.10.0.tar.gz \
    && mv hadoop-2.10.0 /opt/hadoop \
    && rm -rf hadoop-2.10.0 hadoop-2.10.0.tar.gz \
    && echo 'export HADOOP_HOME=/opt/hadoop' >> ~/.bashrc \
    && echo 'export HADOOP_CONF_DIR=/opt/hadoop/etc/hadoop' >> ~/.bashrc \
    && echo 'export HADOOP_MAPRED_HOME=/opt/hadoop' >> ~/.bashrc \
    && echo 'export HADOOP_COMMON_HOME=/opt/hadoop' >> ~/.bashrc \
    && echo 'export HADOOP_HDFS_HOME=/opt/hadoop' >> ~/.bashrc \
    && echo 'export HADOOP_YARN_HOME=/opt/hadoop' >> ~/.bashrc \
    && echo 'export YARN_HOME=/opt/hadoop' >> ~/.bashrc \
    && echo 'export PATH=$PATH:/opt/hadoop/bin' >> ~/.bashrc 
RUN /bin/bash -c "source ~/.bashrc"