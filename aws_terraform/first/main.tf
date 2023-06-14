

terraform {
  required_providers {
    aws = {
      version = "~> 2.70"
    }
  }
}

provider "aws" {
  profile = "default"
  region  = "us-east-1"
}


/* output "hello world" {
  value = "asdfasdsdf"
}
 */
