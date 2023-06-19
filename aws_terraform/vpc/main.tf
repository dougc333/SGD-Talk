
resource "aws_vpc" "main"{
  cidr_block = "10.0.0.0/16"


  tags = {
   Name = "terraform VPC"
  }
}

variable "public_subnet_cidrs" {
  type = list(string)
	description = "terraform public subnet"
	default = ["10.0.1.0/24","10.0.2.0/24","10.0.3.0/24" ]
}

variable "private_subnet_cidrs" {
  type = list(string)
	description = "terraform private subnet"
	default = ["10.0.4.0/24","10.0.5.0/24","10.0.6.0/24"]
}

resource "aws_subnet" "public_subnets" {
  count = length( var.public_subnet_cidrs)
	vpc_id = aws_vpc.main.id
	cidr_block = element(var.public_subnet_cidrs, count.index)
	availability_zone = element(var.azs, count.index)

	tags = {
	  Name = "Public Subnet ${count.index + 1}"
	}
}

resource "aws_subnet" "private_subnets" {
  count = length(var.private_subnet_cidrs)
	vpc_id = aws_vpc.main.id
	cidr_block = element(var.private_subnet_cidrs, count.index)
  availability_zone = element(var.azs, count.index)
  
	tags = {
	  Name = "private subnet ${count.index + 1}"	
	}
}

variable "azs" {
  type = list(string)
	description = "availability zones"
	default = ["us-east-1a","us-east-1b"]

}




