# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

COPY . /app

# Copy the current directory contents into the container at /app
COPY requirements.txt /app

# Copy the service account key into the container
COPY service-account-key.json /app/service-account-key.json

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

ENV GOOGLE_APPLICATION_CREDENTIALS="/app/service-account-key.json"

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run app.py when the container launches
CMD ["python", "run.py"]