mkdir units
javac -classpath hadoop-core-1.2.1.jar -d units app-src/ProcessUnits.java
jar -cvf units.jar -C units/ .
/usr/local/hadoop/bin/hadoop fs -rmdir input_dir
/usr/local/hadoop/bin/hadoop fs -rmdir output_dir
/usr/local/hadoop/bin/hadoop fs -mkdir input_dir
/usr/local/hadoop/bin/hadoop fs -put app-src/sample.txt input_dir
/usr/local/hadoop/bin/hadoop fs -ls input_dir/
/usr/local/hadoop/bin/hadoop jar units.jar hadoop.ProcessUnits input_dir output_dir
/usr/local/hadoop/bin/hadoop fs -ls output_dir
/usr/local/hadoop/bin/hadoop fs -cat output_dir/part-00000
