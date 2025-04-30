from fastapi import FastAPI
import pandas as pd
import glob
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # <-- Allow all origins for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load the PySpark outputs
# Find the file inside the folder
avg_stats_file = glob.glob("output/avg_stats/part-*.csv")[0]
alerts_file = glob.glob("output/alerts/part-*.csv")[0]
top_machines_file = glob.glob("output/top_machines/part-*.csv")[0]



# Now load
stats_df = pd.read_csv(avg_stats_file)
alerts_df = pd.read_csv(alerts_file)
top_machines_df = pd.read_csv(top_machines_file)


@app.get("/")
def root():
    return {"message": "Welcome to IoT Sensor API 🚀"}

@app.get("/api/summary")
def get_summary():
    return stats_df.to_dict(orient="records")

@app.get("/api/alerts")
def get_alerts():
    return alerts_df.to_dict(orient="records")

@app.get("/api/top-machines")
def get_top_machines():
    return top_machines_df.to_dict(orient="records")

