import csv
import random
from datetime import datetime, timedelta

# Config
num_rows = 1000000
sensor_ids = [f"S{i}" for i in range(100)]
machine_ids = [f"M{i}" for i in range(20)]
start_time = datetime(2025, 4, 15, 0, 0, 0)

def generate_sensor_row(index):
    timestamp = start_time + timedelta(seconds=10 * index)
    sensor_id = random.choice(sensor_ids)
    machine_id = random.choice(machine_ids)
    temp = round(random.normalvariate(70, 10), 2)              # Around 70°C
    pressure = round(random.normalvariate(150, 20), 2)         # Around 150 psi
    vibration = round(random.normalvariate(50, 15), 2)         # Hz
    battery = random.randint(30, 100)
    status = "OK"
    
    if temp > 85 or pressure > 200 or vibration > 80:
        status = "ALERT"

    return [timestamp, sensor_id, machine_id, temp, pressure, vibration, battery, status]

# Write to CSV
with open("iot_sensor_data.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["timestamp", "sensor_id", "machine_id", "temp_C", "pressure_psi", "vibration_Hz", "battery_pct", "status"])
    
    for i in range(num_rows):
        row = generate_sensor_row(i)
        writer.writerow(row)

print("✅ Done: 'iot_sensor_data.csv' generated!")
