terraform{
	required_providers{
		aws = {
			source="hashicorp/aws"
		}
	}
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_dynamodb_table" "tf_table" {
	name = "TFTable"
	billing_mode="PROVISIONED"
	read_capacity=1
	write_capacity=1
	hash_key = "HashKey"
	range_key="RangeKey"
  attribute{
		name = "HashKey"
		type = "S"
	}
	attribute{
		name = "RangeKey"
		type = "S"
	}

}
