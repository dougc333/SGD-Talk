import requests
import boto3


class iam:
  def __init__(self):
    print("asfd")
    self.client = boto3.client('iam')
  
  def list_users(self):
    print("listusers")
    self.client
    
  
