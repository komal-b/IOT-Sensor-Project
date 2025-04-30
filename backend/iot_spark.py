from pyspark.sql import SparkSession
from pyspark.sql.functions import avg, count, col

# 1. Create SparkSession
spark = SparkSession.builder \
    .appName("IoT Sensor Analytics") \
    .getOrCreate()

# 2. Read CSV into DataFrame
df = spark.read.csv("iot_sensor_data.csv", header=True, inferSchema=True)

# 3. Quick look at the data
df.printSchema()
df.show(5)

# 4. Basic Stats: Average Temp, Pressure, Vibration by Machine
stats_df = df.groupBy("machine_id").agg(
    avg("temp_C").alias("avg_temp_C"),
    avg("pressure_psi").alias("avg_pressure_psi"),
    avg("vibration_Hz").alias("avg_vibration_Hz")
)

# 5. Find Alerts: Status == "ALERT"
alerts_df = df.filter(col("status") == "ALERT")

# 6. Top Active Machines (by number of logs)
top_machines_df = df.groupBy("machine_id").agg(count("*").alias("total_logs")).orderBy(col("total_logs").desc())

# 7. Save outputs to CSV
stats_df.write.csv("output/avg_stats", header=True, mode="overwrite")
alerts_df.write.csv("output/alerts", header=True, mode="overwrite")
top_machines_df.write.csv("output/top_machines", header=True, mode="overwrite")

print("✅ Processing Complete!")
